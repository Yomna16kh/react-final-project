// נתונים אמיתיים של כרטיסי ביקור לעסקים שונים
export const businessCardsData = [
  {
    id: 1,
    title: "מסעדת אבו גוש הירושלמית",
    subtitle: "אוכל ערבי מסורתי",
    description: "מסעדה משפחתית המגישה מטבח ערבי אותנטי עם מתכונים משפחתיים עתיקי יומין. חומוס, פלאפל, קבב ועוד מהמטבח הערבי המסורתי.",
    phone: "02-5342219",
    email: "info@abugosh-restaurant.co.il",
    web: "www.abugosh-restaurant.co.il",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "מסעדה ערבית מסורתית עם שולחנות וכיסאות מעוצבים",
    address: {
      state: "ירושלים",
      country: "ישראל",
      city: "אבו גוש",
      street: "הרצל",
      houseNumber: 15,
      zip: 9085000
    },
    createdAt: "2024-01-15",
    userId: 2,
    bizNumber: 1001
  },
  {
    id: 2,
    title: "חנות הפרחים של שרה",
    subtitle: "פרחים ועיצוב אירועים",
    description: "חנות פרחים מקצועית המתמחה בזרי כלה, עיצוב אירועים וקישוט חגים. שירות אדיב ויצירתיות בלי גבולות עבור כל אירוע מיוחד.",
    phone: "03-5667788",
    email: "sarah@flowers-design.co.il",
    web: "www.sarah-flowers.co.il",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "חנות פרחים עם זרי פרחים צבעוניים ויפים",
    address: {
      state: "תל אביב",
      country: "ישראל",
      city: "תל אביב",
      street: "דיזנגוף",
      houseNumber: 142,
      zip: 6492102
    },
    createdAt: "2024-01-10",
    userId: 2,
    bizNumber: 1002
  },
  {
    id: 3,
    title: "מוסך דני - שירותי רכב",
    subtitle: "תיקונים ואחזקת רכבים",
    description: "מוסך מקצועי לתיקון ואחזקת כלי רכב. צוות מנוסה, חלקי חילוף מקוריים ושירות איכותי. מתמחים ברכבי יונדאי, קיה וטויוטה.",
    phone: "04-8234567",
    email: "danny@garage-service.co.il",
    web: "www.danny-garage.co.il",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "מוסך עם רכבים ומכונות תיקון",
    address: {
      state: "חיפה",
      country: "ישראל",
      city: "חיפה",
      street: "ההסתדרות",
      houseNumber: 88,
      zip: 3303308
    },
    createdAt: "2024-01-05",
    userId: 2,
    bizNumber: 1003
  },
  {
    id: 4,
    title: "קפה בוטיק אספרסו",
    subtitle: "בית קפה ומאפייה",
    description: "בית קפה אינטימי המגיש קפה איכות מהטובים בעולם, מאפים טריים ועוגות ביתיות. המקום המושלם לפגישת עסקים או ישיבה רגועה.",
    phone: "09-9556677",
    email: "info@espresso-boutique.co.il",
    web: "www.espresso-boutique.co.il",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "בית קפה עם שולחנות עץ ואווירה נעימה",
    address: {
      state: "מרכז",
      country: "ישראל",
      city: "הרצליה",
      street: "בן גוריון",
      houseNumber: 45,
      zip: 4630109
    },
    createdAt: "2024-01-20",
    userId: 2,
    bizNumber: 1004
  },
  {
    id: 5,
    title: "מרפאת שיניים ד\"ר לוי",
    subtitle: "רפואת שיניים מתקדמת",
    description: "מרפאת שיניים מודרנית המציעה טיפולים מתקדמים: השתלות, יישור שיניים, הלבנות ורפואת שיניים אסתטית. טכנולוגיה מתקדמת ושירות מקצועי.",
    phone: "08-6442211",
    email: "clinic@dr-levy.co.il",
    web: "www.dr-levy-dental.co.il",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "מרפאת שיניים מודרנית עם ציוד מתקדם",
    address: {
      state: "דרום",
      country: "ישראל",
      city: "באר שבע",
      street: "רגר",
      houseNumber: 23,
      zip: 8422506
    },
    createdAt: "2024-01-12",
    userId: 2,
    bizNumber: 1005
  },
  {
    id: 6,
    title: "חנות הספרים של יעקב",
    subtitle: "ספרים, תרבות וקפה",
    description: "חנות ספרים עצמאית עם מבחר רחב של ספרים בעברית ובאנגלית, ספרות, מדע ועוד. פינת קפה נעימה לקריאה וארועי תרבות קבועים.",
    phone: "02-6789012",
    email: "yaakov@bookstore-culture.co.il",
    web: "www.yaakov-books.co.il",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "חנות ספרים עם מדפים מלאי ספרים וכורסת קריאה",
    address: {
      state: "ירושלים",
      country: "ישראל",
      city: "ירושלים",
      street: "המלך ג'ורג'",
      houseNumber: 34,
      zip: 9426218
    },
    createdAt: "2024-01-08",
    userId: 2,
    bizNumber: 1006
  },
  {
    id: 7,
    title: "סטודיו יוגה ומדיטציה",
    subtitle: "רוגע גוף ונפש",
    description: "סטודיו מקצועי לשיעורי יוגה, פילאטיס ומדיטציה. מורים מוסמכים, אווירה שלווה ומגוון שיעורים לכל הרמות. מקום מושלם להרגעת הנפש והגוף.",
    phone: "03-7890123",
    email: "info@yoga-meditation.co.il",
    web: "www.yoga-studio.co.il",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "סטודיו יוגה עם מזרונים צבעוניים ואווירה רגועה",
    address: {
      state: "תל אביב",
      country: "ישראל",
      city: "רמת גן",
      street: "ביאליק",
      houseNumber: 67,
      zip: 5252106
    },
    createdAt: "2024-01-25",
    userId: 2,
    bizNumber: 1007
  },
  {
    id: 8,
    title: "בוטיק אופנה 'מירה'",
    subtitle: "אופנה ויוקרה לנשים",
    description: "בוטיק אופנה יוקרתי לנשים המציע קולקציות עדכניות של מעצבים ישראליים ובינלאומיים. ייעוץ אופנה אישי ושירות מותאם אישית.",
    phone: "04-9012345",
    email: "mira@fashion-boutique.co.il",
    web: "www.mira-boutique.co.il",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "בוטיק אופנה עם בגדים תלויים ומתצוגה אלגנטית",
    address: {
      state: "חיפה",
      country: "ישראל",
      city: "נהריה",
      street: "הגליל",
      houseNumber: 12,
      zip: 2290000
    },
    createdAt: "2024-01-18",
    userId: 2,
    bizNumber: 1008
  },
  {
    id: 9,
    title: "טכנאי מחשבים 'איתי'",
    subtitle: "תיקון מחשבים ותמיכה טכנית",
    description: "שירותי תיקון מחשבים וציוד היקפי, התקנת מערכות הפעלה, שדרוגי חומרה ותמיכה טכנית. שירות מהיר ואמין עם אחריות מלאה.",
    phone: "050-1234567",
    email: "itay@computer-tech.co.il",
    web: "www.itay-computers.co.il",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "שולחן עבודה עם מחשב נייד וכלי עבודה טכניים",
    address: {
      state: "מרכז",
      country: "ישראל",
      city: "פתח תקווה",
      street: "רוטשילד",
      houseNumber: 89,
      zip: 4927604
    },
    createdAt: "2024-01-14",
    userId: 2,
    bizNumber: 1009
  },
  {
    id: 10,
    title: "מכון כושר 'פאוור'",
    subtitle: "כושר וחיטוב הגוף",
    description: "מכון כושר מודרני עם ציוד מתקדם, אימונים אישיים וקבוצתיים. מדריכים מוסמכים, תוכניות אימון מותאמות אישית ואווירה מניעה ומעודדת.",
    phone: "09-8765432",
    email: "info@power-gym.co.il",
    web: "www.power-fitness.co.il",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "מכון כושר עם מכשירי כושר מתקדמים ומשקולות",
    address: {
      state: "מרכז",
      country: "ישראל",
      city: "כפר סבא",
      street: "ויצמן",
      houseNumber: 156,
      zip: 4428101
    },
    createdAt: "2024-01-22",
    userId: 2,
    bizNumber: 1010
  },
  {
    id: 11,
    title: "מתוקי שרונה",
    subtitle: "קונדיטוריה ועוגות מעוצבות",
    description: "קונדיטוריה משפחתית המתמחה בעוגות מעוצבות לאירועים, קינוחים ביתיים ומתוקים איכותיים. כל המוצרים מוכנים בעבודת יד עם אהבה.",
    phone: "03-5551234",
    email: "sharon@sweet-treats.co.il",
    web: "www.sharon-sweets.co.il",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "ויטרינת קונדיטוריה עם עוגות ומתוקים מעוצבים",
    address: {
      state: "תל אביב",
      country: "ישראל",
      city: "תל אביב",
      street: "שרונה",
      houseNumber: 28,
      zip: 6158002
    },
    createdAt: "2024-01-16",
    userId: 2,
    bizNumber: 1011
  },
  {
    id: 12,
    title: "מוקד תמיכה טכנית 24/7",
    subtitle: "תמיכה טכנית מקצועית",
    description: "מוקד תמיכה טכנית זמין 24 שעות ביממה לעסקים וארגונים. צוות מומחים בתחומי IT, רשתות, מערכות מידע ואבטחת מידע עם שירות מהיר ויעיל.",
    phone: "077-3456789",
    email: "support@tech-center.co.il",
    web: "www.tech-support-247.co.il",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "מוקד תמיכה טכנית עם אוזניות ומחשבים",
    address: {
      state: "מרכז",
      country: "ישראל",
      city: "רעננה",
      street: "אחוזה",
      houseNumber: 77,
      zip: 4350507
    },
    createdAt: "2024-01-11",
    userId: 2,
    bizNumber: 1012
  }
];

// פונקציות עזר לניהול הנתונים
export const getBusinessCardById = (id) => {
  return businessCardsData.find(card => card.id === parseInt(id));
};

export const getBusinessCardsByUserId = (userId) => {
  return businessCardsData.filter(card => card.userId === userId);
};

export const searchBusinessCards = (searchTerm) => {
  if (!searchTerm) return businessCardsData;
  
  const term = searchTerm.toLowerCase();
  return businessCardsData.filter(card => 
    card.title.toLowerCase().includes(term) ||
    card.subtitle.toLowerCase().includes(term) ||
    card.description.toLowerCase().includes(term)
  );
};
