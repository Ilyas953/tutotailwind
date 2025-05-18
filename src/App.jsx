import { useState, useContext } from 'react'
import './App.css'
import { logo } from './asset'
import { extentdata } from './data'
import { Extensioncontext } from './extensioncontext'

function Extension() {
  return (
    <div className="flex items-center h-16 w-11/12 mx-auto text-white px-4 bg-gray-800 rounded-xl text-xl font-bold shadow-xl">
      <img src={logo} alt="logo" className="h-10 w-auto mr-4" />
      <span>Extension Manager</span>
    </div>
  )
}

function Filtration() {
  const { filtre, setFiltre } = useContext(Extensioncontext)
  const typage = ['active', 'inactive', 'all']

  function Bouton({ type }) {
    const isActive = type === filtre
    const activeClass = isActive
      ? 'bg-red-500 hover:bg-red-400 text-black'
      : 'bg-gray-800 hover:bg-gray-700 text-white'

    return (
      <button
        onClick={() => setFiltre(type)}
        className={`w-24 py-2 rounded-3xl transition-colors duration-300 ${activeClass}`}
      >
        {type}
      </button>
    )
  }

  return (
    <div className="mx-auto w-11/12 text-white rounded-xl shadow-2xl mt-6">
      <p className="text-xl sm:text-2xl font-bold mt-6 mb-4">Extensions list</p>
      <div className="flex flex-wrap justify-end gap-3">
        {typage.map((valeur) => (
          <Bouton key={valeur} type={valeur} />
        ))}
      </div>
    </div>
  )
}

function Bloc({ extension }) {
  const { clic } = useContext(Extensioncontext)

  const style1 = extension.active ? 'bg-red-500' : 'bg-slate-950'
  const style2 = extension.active ? 'ml-14' : 'ml-0'

  return (
    <li className="transition-colors duration-300 bg-gray-800 hover:bg-gray-900 rounded-2xl border border-white p-4 flex flex-col gap-2">
      <p className="text-lg font-semibold">{extension.nom}</p>
      <img src={extension.image} className="h-32 object-contain mx-auto" />
      <p className="text-sm">{extension.description}</p>
      <div
        className={`w-20 h-6 rounded-xl ${style1} transition-colors duration-300 cursor-pointer`}
        onClick={() => clic(extension.id)}
      >
        <div
          className={`bg-white rounded-full h-6 w-6 transition-[margin] duration-300 ${style2}`}
        ></div>
      </div>
    </li>
  )
}

function Listextension({ filteredtab }) {
  return (
    <div className="w-11/12 mx-auto mt-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredtab.map((a) => (
          <Bloc key={a.id} extension={a} />
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [listextent, setListextent] = useState(extentdata)
  const [filtre, setFiltre] = useState('active')

  function clic(id) {
    setListextent((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    )
  }

  function filtrage(tab, filtre) {
    if (filtre === 'active') return tab.filter((t) => t.active === true)
    if (filtre === 'inactive') return tab.filter((t) => t.active !== true)
    if (filtre === 'all') return tab
    return []
  }

  const filteredtab = filtrage(listextent, filtre)

  return (
    <Extensioncontext.Provider
      value={{ listextent, setListextent, filtre, setFiltre, clic, filtrage }}
    >
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 text-white pb-10">
        <header className="pt-6">
          <Extension />
        </header>
        <nav>
          <Filtration />
        </nav>
        <section>
          <Listextension filteredtab={filteredtab} />
        </section>
      </div>
    </Extensioncontext.Provider>
  )
}

export default App