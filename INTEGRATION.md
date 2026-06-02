# Ako integrovať Tutoriál do hlavnej aplikácie

Tento projekt je navrhnutý tak, aby bežal v `iframe` v rámci vašej hlavnej aplikácie.

## 1. HTML/React kód pre Modálne okno
V hlavnej aplikácii pridajte komponent, ktorý otvorí tento tutoriál:

```tsx
const openTutorial = () => {
  setTutorialOpen(true);
};

// ... v renderi ...
{isTutorialOpen && (
  <div style={{
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <iframe
      src="https://tutorial.vasadomena.com?lang=sk"
      allowTransparency={true}
      style={{
        width: '700px',
        height: 'clamp(400px, 78vh, 560px)',
        border: 'none',
        background: 'transparent',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    />
  </div>
)}
```

## 2. Spracovanie zatvorenia (postMessage)
Tutoriál posiela správu, keď užívateľ klikne na "Zavrieť" alebo "Dokončiť". V hlavnej appke pridajte listener:

```tsx
useEffect(() => {
  const handleMessage = (event) => {
    if (event.data.type === 'TUTORIAL_CLOSE') {
      setTutorialOpen(false);
      if (event.data.completed) {
        console.log("Užívateľ dokončil tutoriál");
      }
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

## 3. Nahrávanie obrázkov
Obrázky nahrajte do priečinka `/public/tutorial/` pod názvami, ktoré sú definované v `src/constants.ts`.
