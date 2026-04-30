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

const HymnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HymnCard = styled.div`
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    background: rgba(244, 196, 48, 0.1);
    border-color: rgba(244, 196, 48, 0.3);
  }

  .number {
    font-size: 14px;
    font-weight: 700;
    color: #f4c430;
    min-width: 40px;
  }

  .info {
    flex: 1;
    .name { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 2px; }
    .author { font-size: 12px; color: rgba(255,255,255,0.4); }
  }

  .play {
    font-size: 20px;
  }
`;

const hymns = [
  { number: 1, name: 'Deus Cuidará', author: 'Hino Harpa Cristã' },
  { number: 45, name: 'Face a Face', author: 'Hino Harpa Cristã' },
  { number: 78, name: 'Grandes Coisas', author: 'Hino Harpa Cristã' },
  { number: 112, name: 'Há um Rio Profundo', author: 'Hino Harpa Cristã' },
  { number: 156, name: 'Que Alegria É Crer Em Deus', author: 'Hino Harpa Cristã' },
  { number: 200, name: 'A Graça de Deus', author: 'Hino Harpa Cristã' },
  { number: 234, name: 'Santo, Santo, Santo', author: 'Hino Harpa Cristã' },
  { number: 278, name: 'Mais Perto Quero Estar', author: 'Hino Harpa Cristã' },
  { number: 310, name: 'Luz do Mundo', author: 'Hino Harpa Cristã' },
  { number: 345, name: 'No Monte Calvário', author: 'Hino Harpa Cristã' },
];

const HymnsPage = () => (
  <Page>
    <Title>🎵 Hinos e Louvores</Title>
    <Subtitle>Harpa Cristã — Cânticos de louvor e adoração</Subtitle>
    <HymnList>
      {hymns.map(h => (
        <HymnCard key={h.number}>
          <div className="number">#{h.number}</div>
          <div className="info">
            <div className="name">{h.name}</div>
            <div className="author">{h.author}</div>
          </div>
          <div className="play">▶️</div>
        </HymnCard>
      ))}
    </HymnList>
  </Page>
);

export default HymnsPage;
