import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from "antd";
import "./fonts/fonts.css";
import './index.css';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#e54e4e",
            }
        }}
    >
        <App />
    </ConfigProvider>
  </StrictMode>,
)
