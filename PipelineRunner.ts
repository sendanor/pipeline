// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import Pipeline, { isPipeline } from "./types/Pipeline";
import Stage, { isStage } from "./types/Stage";
import Step from "./types/Step";
import Job, { isJob } from "./types/Job";
import LogService from "../ts/LogService";
import PipelineController from "./controllers/pipeline/PipelineController";
import { map } from "../ts/modules/lodash";
import StageController from "./controllers/stage/StageController";
import JobController from "./controllers/job/JobController";
import StepController from "./controllers/step/types/StepController";
import { isScript } from "./types/Script";
import ScriptController from "./controllers/step/script/ScriptController";
import Controller from "./controllers/types/Controller";
import { ObserverDestructor } from "../ts/Observer";
import { PipelineModel } from "./types/PipelineModel";
import PipelineContext from "./PipelineContext";
import JsonControllerAction from "./controllers/step/json/JsonControllerAction";
import { isJsonStep } from "./types/JsonStep";
import JsonController from "./controllers/step/json/JsonController";
import Name from "./types/Name";
import { ReadonlyJsonAny } from "../ts/Json";
import { isCsvStep } from "./types/CsvStep";
import CsvController from "./controllers/step/csv/CsvController";

const LOG = LogService.createLogger('PipelineRunner');

export class PipelineRunner {

    public static createStepController (
        step    : Step,
        context : PipelineContext
    ) : StepController {

        if (isJsonStep(step)) {
            return new JsonController(
                context,
                step.name,
                step.json,
                step.action,
                step.output
            );
        }

        if (isCsvStep(step)) {
            return new CsvController(
                context,
                step.name,
                step.csv,
                step.action,
                step.output
            );
        }

        if (isScript(step)) {
            return new ScriptController(
                context,
                step.name,
                step.command,
                step.args,
                step.env
            );
        }

        throw new TypeError(`Unknown step type: ${step.name}`);

    }

    public static createJobController (
        job     : Job,
        context : PipelineContext
    ) : JobController {

        return new JobController(
            context,
            job.name,
            map(job.steps, (step: Step) : StepController => this.createStepController(step, context))
        );

    }

    public static createStageController (
        stage   : Stage,
        context : PipelineContext
    ) : StageController {

        return new StageController(
            context,
            stage.name,
            map(stage.jobs, (job : Job) : JobController => this.createJobController(job, context))
        );

    }

    public static createPipelineController (
        model   : Pipeline,
        context : PipelineContext
    ) : PipelineController {

        return new PipelineController(
            context,
            model.name,
            map(model.stages, (stage : Stage) : StageController => this.createStageController(stage, context))
        );

    }

    public static createController (
        model   : PipelineModel,
        context : PipelineContext
    ) : Controller {

        if ( isPipeline(model) ) {

            LOG.debug(`Starting pipeline ${model.name}`);
            return this.createPipelineController(model, context);

        } else if ( isStage(model) ) {

            LOG.debug(`Starting stage ${model.name}`);
            return this.createStageController(model, context);

        } else if ( isJob(model) ) {

            LOG.debug(`Starting job ${model.name}`);
            return this.createJobController(model, context);

        }

        LOG.debug(`Starting step ${model.name}`);
        return this.createStepController(model, context);

    }

    public static async startAndWaitUntilFinished (controller : Controller) : Promise<void> {

        return await new Promise((resolve, reject) => {

            let listener : ObserverDestructor | undefined;

            try {

                listener = controller.onChanged(() => {
                    try {

                        if (controller.isFinished()) {

                            LOG.debug(`Controller ${controller.toString()} finished`);

                            if (listener) {
                                listener();
                                listener = undefined;
                            }

                            resolve();

                        } else {
                            LOG.debug(`Controller ${controller.toString()} state changed`);
                        }

                    } catch (err) {

                        if (listener) {
                            listener();
                            listener = undefined;
                        }

                        reject(err);

                    }
                });

                controller.start();

                LOG.debug(`Controller ${controller.toString()} started`);

            } catch (err) {

                if (listener) {
                    listener();
                    listener = undefined;
                }

                reject(err);

            }

        });

    }

}

export default PipelineRunner;
