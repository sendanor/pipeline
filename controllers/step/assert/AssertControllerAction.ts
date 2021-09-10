// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

export enum AssertControllerAction {
    EQUALS = "equals"
}

export function isAssertControllerAction (value: any): value is AssertControllerAction {
    switch (value) {
        case AssertControllerAction.EQUALS:
            return true;
    }
    return false;
}

export default AssertControllerAction;
