import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItemText, TextField
} from '@material-ui/core';

import { i18n, withTranslation } from '../plugin/i18n';

async function getItems(origin) {
  const {
    data: { data }
  } = await axios.get(`${origin}/api/items`);

  return data;
}

function Index({ t, currentLanguage, initItems, origin }) {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(initItems);

  function handleChange(event) {
    setItem(event.target.value);
  }

  async function submit() {
    await axios.post(`${origin}/api/items`, {
      itemName: item
    });
    setItem('');
    setItems(await getItems(origin));
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={ 6 }>
          <Card>
            <CardContent>
              <div>
                <TextField label={'standart'} value={item} onChange={handleChange}/><Button variant={'contained'} color={'primary'} onClick={submit}>Add</Button>
              </div>
              <List>
                { items.map((item) => <ListItemText key={item._id}>{ item.itemName }</ListItemText>) }
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={ 6 }>
          <Card>
            <CardContent>
              <Typography variant={ 'h3' }>{ currentLanguage }</Typography>
              <Button
                color={ 'primary' }
                variant={ 'outlined' }
                onClick={ () =>
                  i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
                }
              >
                { t('change-locale') }
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

Index.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);

  return {
    origin,
    initItems: await getItems(origin),
    namespacesRequired: ['common', 'test'],
    currentLanguage: req ? req.language : i18n.language
  };
};

Index.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('common')(Index);
