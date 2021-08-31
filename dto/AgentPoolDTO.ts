// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isRegularObject,
    isUndefined
} from "../../ts/modules/lodash";

import AgentPoolModel, { isAgentPoolModel, parseAgentPoolModel } from "../types/AgentPoolModel";

export interface AgentPoolDTO {

    readonly model : AgentPoolModel;

}

export function isAgentPoolDTO (value: any): value is AgentPoolDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'model'
        ])
        && isAgentPoolModel(value?.model)
    );
}

export function isPartialAgentPoolDTO (value: any): value is Partial<AgentPoolDTO> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'model'
        ])
        && ( isUndefined(value?.model) || isAgentPoolModel(value?.model) )
    );
}

export function stringifyAgentPoolDTO (value: AgentPoolDTO): string {
    return `AgentDTO(${value})`;
}

export function parseAgentPoolDTO (value: any): AgentPoolDTO | undefined {
    const model : AgentPoolModel | undefined = parseAgentPoolModel(value?.model);
    if (model === undefined) return undefined;
    return {model};
}

export default AgentPoolDTO;
