import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import PropTypes from 'prop-types';

import Appointment from '~/components/Appointment';
import Background from '~/components/Background';
import api from '~/services/api';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) loadAppointments();
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

const TabIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: TabIcon,
};

TabIcon.propTypes = {
  tintColor: PropTypes.string,
};

TabIcon.defaultProps = {
  tintColor: '',
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool,
};

Dashboard.defaultProps = {
  isFocused: true,
};

export default withNavigationFocus(Dashboard);
