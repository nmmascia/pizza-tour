import formatFn from 'date-fns/format';
import React from 'react';

interface FormattedDateProps {
  date: Date;
  format?: string;
}

const FormattedDate = ({ date, format = 'MMM. do, yyyy' }: FormattedDateProps) => <>{formatFn(date, format)}</>;

export default FormattedDate;
