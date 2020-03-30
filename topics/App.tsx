import React, { useState } from 'react';
import { logger } from './functions';

interface Props {
    firstName: string;
    lastName: string;
}

const FullName: React.FC<Props> = ({ firstName, lastName }) => {
    const [state] = useState<{ fullName: string | null }>({ fullName: `${firstName} ${lastName}` });

    return <div>Hello {state.fullName}</div>;
};

interface FormProps<T> {
    values: T;
    children: (values: T) => JSX.Element;
}

const Form = <T extends {}>({ values, children }: FormProps<T>) => children(values);

const App: React.FC = () => (
    <div className="App">
        <Form values={{ firstName: 'Bob', lastName: 'Smith' }}>
            {values => (
                <div>
                    {values.firstName} {values.lastName}
                </div>
            )}
        </Form>
        {/* Can also override the types... */}
        <Form<{ id: string }> values={{ id: '123' }}>{values => <div>{values.id}</div>}</Form>
        <Form<{ id: number }> values={{ id: 123 }}>{values => <div>{values.id}</div>}</Form>
    </div>
);

logger(<App />, true);
logger(<FullName firstName="Jack" lastName="McGregor" />, true);
