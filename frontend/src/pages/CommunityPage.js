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

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const MemberCard = styled.div`
  background: rgba(244, 196, 48, 0.05);
  border: 1px solid rgba(244, 196, 48, 0.15);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(244, 196, 48, 0.1);
    border-color: rgba(244, 196, 48, 0.3);
  }

  .avatar { font-size: 36px; margin-bottom: 8px; }
  .name { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .role { font-size: 12px; color: #f4c430; }
`;

const members = [
  { avatar: '👨‍⚕️', name: 'Pastor IA', role: 'Assistente Espiritual' },
  { avatar: '👩', name: 'Irmã Maria', role: 'Diaconisa' },
  { avatar: '👨', name: 'Irmão José', role: 'Presbítero' },
  { avatar: '👩‍🦱', name: 'Irmã Ana', role: 'Líder de Louvor' },
  { avatar: '👨‍🦳', name: 'Irmão Pedro', role: 'Diácono' },
  { avatar: '👧', name: 'Irmã Raquel', role: 'EBD - Professora' },
];

const CommunityPage = () => (
  <Page>
    <Title>👥 Comunidade</Title>
    <Subtitle>Irmãos e irmãs em Cristo — Corpo de Cristo</Subtitle>
    <MemberGrid>
      {members.map(m => (
        <MemberCard key={m.name}>
          <div className="avatar">{m.avatar}</div>
          <div className="name">{m.name}</div>
          <div className="role">{m.role}</div>
        </MemberCard>
      ))}
    </MemberGrid>
  </Page>
);

export default CommunityPage;
