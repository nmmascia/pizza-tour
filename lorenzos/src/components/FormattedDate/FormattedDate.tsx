import formatFn from 'date-fns/format';
import React from 'react';
import isString from 'lodash/isString';
import parseISO from 'date-fns/parseISO';

interface FormattedDateProps {
  date: Date | string;
  format?: string;
}

const FormattedDate = ({ date, format = 'MMM. do, yyyy' }: FormattedDateProps) => {
  if (isString(date)) return <>{formatFn(parseISO(date), format)}</>;
  return <>{formatFn(date, format)}</>;
};

export default FormattedDate;
