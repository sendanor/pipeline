// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export enum ConcatControllerAction {
    CONCAT = "concat"
}

export function isConcatControllerAction (value: any): value is ConcatControllerAction {
    switch (value) {
        case ConcatControllerAction.CONCAT:
            return true;
    }
    return false;
}

export default ConcatControllerAction;
