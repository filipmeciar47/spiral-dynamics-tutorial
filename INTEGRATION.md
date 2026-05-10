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
    backgroundColor: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      backgroundColor: '#000',
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <iframe 
        src="https://tutorial.vasadomena.com?lang=sk" 
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
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
