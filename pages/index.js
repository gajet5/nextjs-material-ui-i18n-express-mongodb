import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';

import { i18n, withTranslation } from '../i18n'

function Index({ t }) {
  return (
    <div>
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}
      >
        {t('change-locale')}
      </Button>
      <Typography>
        {t('company-name')}
      </Typography>
    </div>
  );
}

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

Index.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Index)
