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

const PrayerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PrayerCard = styled.div`
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(244, 196, 48, 0.1);
    border-color: rgba(244, 196, 48, 0.3);
  }

  .icon { font-size: 28px; margin-bottom: 8px; }
  .name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.5; }
`;

const prayers = [
  { icon: '🙏', name: 'Oração de Cura', desc: 'Clame a Deus pela restauração física, emocional e espiritual. "Eu sou o Senhor que te sara." (Êxodo 15:26)' },
  { icon: '🕊️', name: 'Oração de Paz', desc: 'Entregue suas ansiedades ao Senhor. "A minha paz vos dou." (João 14:27)' },
  { icon: '💪', name: 'Oração de Força', desc: 'Busque vigor divino para os desafios. "Tudo posso naquele que me fortalece." (Filipenses 4:13)' },
  { icon: '📖', name: 'Oração de Sabedoria', desc: 'Peça direção divina para suas decisões. "Se algum de vós tem falta de sabedoria, peça-a a Deus." (Tiago 1:5)' },
  { icon: '🏠', name: 'Oração pela Família', desc: 'Interceda pelos seus amados. "Eu e a minha casa serviremos ao Senhor." (Josué 24:15)' },
  { icon: '❤️', name: 'Oração de Gratidão', desc: 'Agradeça pelas bênçãos recebidas. "Em tudo dai graças." (1 Tessalonicenses 5:18)' },
];

const PrayersPage = () => (
  <Page>
    <Title>🙏 Orações</Title>
    <Subtitle>Escolha uma oração para meditar e clamar ao Senhor</Subtitle>
    <PrayerList>
      {prayers.map(p => (
        <PrayerCard key={p.name}>
          <div className="icon">{p.icon}</div>
          <div className="name">{p.name}</div>
          <div className="desc">{p.desc}</div>
        </PrayerCard>
      ))}
    </PrayerList>
  </Page>
);

export default PrayersPage;
