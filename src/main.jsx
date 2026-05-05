import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Siswa from './Siswa.jsx'
import Iqra from './Iqra.jsx'
import Hijaiyah from './Hijaiyah.jsx'
import DetailHijaiyah from './DetailHijaiyah.jsx'
import DetailHijaiyahIsyarat from './DetailHijaiyahIsyarat.jsx'
import IqraHarakat from './IqraHarakat.jsx'
import IqraSambungHuruf from './IqraSambungHuruf.jsx'
import IqraTanwin from './IqraTanwin.jsx'
import IqraSukunTasydid from './IqraSukunTasydid.jsx'
import IqraMad from './IqraMad.jsx'
import AyatPendek from './AyatPendek.jsx'
import DetailAyat from './DetailAyat.jsx'
import DetailAyatIsyarat from './DetailAyatIsyarat.jsx'
import MenulisHijaiyah from './MenulisHijaiyah.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/siswa" element={<Siswa />} />
        
        {/* Iqra' Routes */}
        <Route path="/iqra" element={<Iqra />} />
        <Route path="/iqra/hijaiyah" element={<Hijaiyah />} />
        <Route path="/iqra/hijaiyah/:letter" element={<DetailHijaiyah />} />
        <Route path="/iqra/hijaiyah/isyarat/:letter" element={<DetailHijaiyahIsyarat />} />
        <Route path="/iqra/harakat" element={<IqraHarakat />} />
        <Route path="/iqra/sambung-huruf" element={<IqraSambungHuruf />} />
        <Route path="/iqra/tanwin" element={<IqraTanwin />} />
        <Route path="/iqra/sukun-tasydid" element={<IqraSukunTasydid />} />
        <Route path="/iqra/mad" element={<IqraMad />} />

        {/* Legacy redirects for old routes */}
        <Route path="/hijaiyah" element={<Hijaiyah />} />
        <Route path="/hijaiyah/ba" element={<DetailHijaiyah />} />
        <Route path="/hijaiyah/isyarat/ba" element={<DetailHijaiyahIsyarat />} />

        {/* Ayat Pendek */}
        <Route path="/ayat-pendek" element={<AyatPendek />} />
        <Route path="/ayat-pendek/al-kautsar" element={<DetailAyat />} />
        <Route path="/ayat-pendek/al-asr" element={<DetailAyat />} />
        <Route path="/ayat-pendek/isyarat/:surah" element={<DetailAyatIsyarat />} />

        {/* Menulis Hijaiyah */}
        <Route path="/menulis-hijaiyah" element={<MenulisHijaiyah />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
