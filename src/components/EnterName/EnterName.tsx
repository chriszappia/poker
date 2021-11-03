import React, { useState } from "react";
import { setUserName } from "../../app/UserSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { EnterNameInput } from "./Style";
import { Form } from "semantic-ui-react";

function EnterName(): JSX.Element {
    const userName = useAppSelector((state) => state.user.userName);

    const [name, setName] = useState<string>(userName);

    const dispatch = useDispatch();

    return (
        <Form>
            <Form.Field>
                <EnterNameInput
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(_) => dispatch(setUserName(name))}
                />
            </Form.Field>
        </Form>
    );
}

export default EnterName;
