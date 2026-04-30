import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #f4c430;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 32px;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EventCard = styled.div`
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 20px;
  transition: all 0.2s;

  &:hover {
    background: rgba(244, 196, 48, 0.1);
    border-color: rgba(244, 196, 48, 0.3);
  }

  .date {
    background: rgba(244, 196, 48, 0.15);
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    min-width: 64px;
    .day { font-size: 24px; font-weight: 700; color: #f4c430; }
    .month { font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  }

  .info {
    flex: 1;
    .name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 4px; }
    .time { font-size: 13px; color: #f4c430; margin-bottom: 4px; }
    .desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.4; }
  }
`;

const events = [
  { day: '01', month: 'Mai', name: 'Culto de Celebração', time: '19:00', desc: 'Culto de louvor e adoração com pregação da Palavra.' },
  { day: '05', month: 'Mai', name: 'Escola Bíblica Dominical', time: '09:00', desc: 'Estudo da Palavra de Deus para todas as idades.' },
  { day: '10', month: 'Mai', name: 'Culto de Oração', time: '20:00', desc: 'Momento de intercessão e busca ao Senhor.' },
  { day: '15', month: 'Mai', name: 'Vigília de Oração', time: '22:00', desc: 'Noite inteira de oração e consagração.' },
  { day: '20', month: 'Mai', name: 'Conferência de Missões', time: '19:30', desc: 'Conferência missionária com missionários especiais.' },
  { day: '25', month: 'Mai', name: 'Culto da Família', time: '10:00', desc: 'Culto especial para famílias com atividades para crianças.' },
];

const EventsPage = () => (
  <Page>
    <Title>📅 Eventos</Title>
    <Subtitle>Agenda de eventos e programações da igreja</Subtitle>
    <EventList>
      {events.map((e, i) => (
        <EventCard key={i}>
          <div className="date">
            <div className="day">{e.day}</div>
            <div className="month">{e.month}</div>
          </div>
          <div className="info">
            <div className="name">{e.name}</div>
            <div className="time">🕐 {e.time}</div>
            <div className="desc">{e.desc}</div>
          </div>
        </EventCard>
      ))}
    </EventList>
  </Page>
);

export default EventsPage;
