/*
 * @Author: chase
 * @Date: 2025-08-06 14:32:19
 * @LastEditors: chase
 * @LastEditTime: 2025-08-06 14:48:44
 * @FilePath: \react\reacti-project\src\main.jsx
 * @Description: 
 * 
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const root = createRoot(document.getElementById('root'))
root.render(<App />)

