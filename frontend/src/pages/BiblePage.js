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

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
`;

const BookCard = styled.div`
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: rgba(244, 196, 48, 0.12);
    border-color: rgba(244, 196, 48, 0.3);
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }

  .chapters {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
  }
`;

const books = [
  { name: 'Gênesis', chapters: 50 }, { name: 'Êxodo', chapters: 40 },
  { name: 'Levítico', chapters: 27 }, { name: 'Números', chapters: 36 },
  { name: 'Deuteronômio', chapters: 34 }, { name: 'Josué', chapters: 24 },
  { name: 'Juízes', chapters: 21 }, { name: 'Rute', chapters: 4 },
  { name: '1 Samuel', chapters: 31 }, { name: '2 Samuel', chapters: 24 },
  { name: '1 Reis', chapters: 22 }, { name: '2 Reis', chapters: 25 },
  { name: '1 Crônicas', chapters: 29 }, { name: '2 Crônicas', chapters: 36 },
  { name: 'Esdras', chapters: 10 }, { name: 'Neemias', chapters: 13 },
  { name: 'Ester', chapters: 10 }, { name: 'Jó', chapters: 42 },
  { name: 'Salmos', chapters: 150 }, { name: 'Provérbios', chapters: 31 },
  { name: 'Eclesiastes', chapters: 12 }, { name: 'Cantares', chapters: 8 },
  { name: 'Isaías', chapters: 66 }, { name: 'Jeremias', chapters: 52 },
  { name: 'Ezequiel', chapters: 48 }, { name: 'Daniel', chapters: 12 },
  { name: 'Mateus', chapters: 28 }, { name: 'Marcos', chapters: 16 },
  { name: 'Lucas', chapters: 24 }, { name: 'João', chapters: 21 },
  { name: 'Atos', chapters: 28 }, { name: 'Romanos', chapters: 16 },
  { name: '1 Coríntios', chapters: 16 }, { name: '2 Coríntios', chapters: 13 },
  { name: 'Gálatas', chapters: 6 }, { name: 'Efésios', chapters: 6 },
  { name: 'Filipenses', chapters: 4 }, { name: 'Apocalipse', chapters: 22 },
];

const BiblePage = () => {
  return (
    <Page>
      <Title>📖 Bíblia Sagrada</Title>
      <Subtitle>Escolha um livro para começar a leitura</Subtitle>
      <BookGrid>
        {books.map(b => (
          <BookCard key={b.name}>
            <div className="name">{b.name}</div>
            <div className="chapters">{b.chapters} capítulos</div>
          </BookCard>
        ))}
      </BookGrid>
    </Page>
  );
};

export default BiblePage;
