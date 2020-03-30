import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * NONNULLABLE
 * Constructs a type by extracting from T all properties that are assignable to U
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]

// Example
const makeRequired = <P extends {}>(props: P) => {
    type PKeys = keyof P;

    return props as {
        [Key in PKeys]: NonNullable<P[Key]>;
    };
};

interface Props {
    color: 'red' | 'green';
}

const props: Props = {
    color: 'green'
};

const enhancedProps = makeRequired(props);
const color = enhancedProps.color;

export default function() {
    logLine('↓↓↓ NonNullable ↓↓↓');
    logger(color);
    logLine('↑↑↑ NonNullable ↑↑↑');
}
