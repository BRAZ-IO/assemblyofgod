import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Navigation from '../components/common/Navigation';

const SettingsContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const SettingsContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const SettingsHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const SettingsTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const SettingsSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const SettingsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  color: white;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const SettingsGroup = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  color: white;
  
  .label-text {
    font-weight: 500;
    margin-bottom: 0.3rem;
  }
  
  .label-description {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  width: 48px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background: #4ade80;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const SelectInput = styled.select`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  
  option {
    background: #667eea;
    color: white;
  }
`;

const TextInput = styled.input`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    soundEffects: false,
    autoSave: true,
    language: 'en',
    fontSize: 'medium',
    apiEndpoint: 'https://api.cortexai.com',
    maxTokens: 2048,
    temperature: 0.7
  });

  const handleToggleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <SettingsContainer>
      <Navigation />
      <Layout>
        <SettingsContent>
          <SettingsHeader>
            <SettingsTitle>Settings</SettingsTitle>
            <SettingsSubtitle>Customize your CortexAI experience</SettingsSubtitle>
          </SettingsHeader>

          <SettingsSection>
            <SectionTitle>Appearance</SectionTitle>
            <SettingsGroup>
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Dark Mode</div>
                  <div className="label-description">Use dark theme across the application</div>
                </SettingLabel>
                <ToggleSwitch>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.darkMode}
                    onChange={(e) => handleToggleChange('darkMode', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </SettingRow>
              
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Font Size</div>
                  <div className="label-description">Adjust text size for better readability</div>
                </SettingLabel>
                <SelectInput 
                  value={settings.fontSize}
                  onChange={(e) => handleInputChange('fontSize', e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </SelectInput>
              </SettingRow>
            </SettingsGroup>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>Notifications</SectionTitle>
            <SettingsGroup>
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Push Notifications</div>
                  <div className="label-description">Receive notifications about new messages</div>
                </SettingLabel>
                <ToggleSwitch>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={(e) => handleToggleChange('notifications', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </SettingRow>
              
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Sound Effects</div>
                  <div className="label-description">Play sounds for messages and interactions</div>
                </SettingLabel>
                <ToggleSwitch>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.soundEffects}
                    onChange={(e) => handleToggleChange('soundEffects', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </SettingRow>
            </SettingsGroup>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>AI Configuration</SectionTitle>
            <SettingsGroup>
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">API Endpoint</div>
                  <div className="label-description">Custom API server URL</div>
                </SettingLabel>
                <TextInput 
                  value={settings.apiEndpoint}
                  onChange={(e) => handleInputChange('apiEndpoint', e.target.value)}
                  placeholder="API endpoint URL"
                />
              </SettingRow>
              
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Max Tokens</div>
                  <div className="label-description">Maximum response length</div>
                </SettingLabel>
                <TextInput 
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                />
              </SettingRow>
              
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Temperature</div>
                  <div className="label-description">AI response creativity (0.0-1.0)</div>
                </SettingLabel>
                <TextInput 
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={settings.temperature}
                  onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                />
              </SettingRow>
            </SettingsGroup>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>Data & Storage</SectionTitle>
            <SettingsGroup>
              <SettingRow>
                <SettingLabel>
                  <div className="label-text">Auto-save Conversations</div>
                  <div className="label-description">Automatically save chat history</div>
                </SettingLabel>
                <ToggleSwitch>
                  <ToggleInput 
                    type="checkbox" 
                    checked={settings.autoSave}
                    onChange={(e) => handleToggleChange('autoSave', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </SettingRow>
            </SettingsGroup>
          </SettingsSection>

          <SaveButton onClick={handleSave}>
            Save Settings
          </SaveButton>
        </SettingsContent>
      </Layout>
    </SettingsContainer>
  );
};

export default SettingsPage;
