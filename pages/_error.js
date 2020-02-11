import React from 'react';
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core';

import { withTranslation } from '../plugin/i18n';

function Error({ statusCode, t }) {
  return (
    <Typography>
      {statusCode
        ? t('error-with-status', { statusCode })
        : t('error-without-status')}
    </Typography>
  );
}

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;

  if (res) {
    ({ statusCode } = res)
  } else if (err) {
    ({ statusCode } = err)
  }

  return {
    namespacesRequired: ['common'],
    statusCode,
  }
};

Error.defaultProps = {
  statusCode: null,
};

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Error)
