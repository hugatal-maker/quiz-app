export const DIFFICULTY_META = {
  easy: {
    label: "קל",
    className: "difficulty-easy"
  },
  medium: {
    label: "בינוני",
    className: "difficulty-medium"
  },
  hard: {
    label: "קשה",
    className: "difficulty-hard"
  },
  "very-hard": {
    label: "קשה מאוד",
    className: "difficulty-very-hard"
  }
};

export const QUESTION_BANK = [
  {
    id: "mean-basic",
    text: "מהו הממוצע של קבוצת הנתונים 4, 5, 9, 12?",
    difficulty: "easy",
    options: [
      { text: "6.5", isCorrect: false },
      { text: "7.5", isCorrect: true },
      { text: "8", isCorrect: false },
      { text: "9", isCorrect: false }
    ],
    explanation:
      "מחברים את כל הערכים (4 + 5 + 9 + 12 = 30) ומחלקים ב-4. 30 / 4 = 7.5."
  },
  {
    id: "median-even",
    text: "עבור המדגם המסודר 8, 9, 12, 15, 22, 25 מהו החציון?",
    difficulty: "easy",
    options: [
      { text: "12", isCorrect: false },
      { text: "13.5", isCorrect: true },
      { text: "15", isCorrect: false },
      { text: "17", isCorrect: false }
    ],
    explanation:
      "כאשר מספר התצפיות זוגי, מחשבים את הממוצע של שני הערכים האמצעיים: (12 + 15) / 2 = 13.5."
  },
  {
    id: "variance-sample",
    text: "באיזו נוסחה יש להשתמש לחישוב שונות של מדגם בעל n תצפיות?",
    difficulty: "medium",
    options: [
      { text: "sum((xi - mu)^2) / n", isCorrect: false },
      { text: "sum((xi - x_bar)^2) / (n - 1)", isCorrect: true },
      { text: "sum((xi - mu)) / n", isCorrect: false },
      { text: "sum((xi - x_bar)) / (n - 1)", isCorrect: false }
    ],
    explanation:
      "בשונות מדגמית מחלקים את סכום הריבועים ב-n - 1 כדי לקבל מעריך חסר הטיה."
  },
  {
    id: "binomial-probability",
    text:
      "מטבע הוגן מוטל 5 פעמים. מה ההסתברות לקבל בדיוק 3 פעמים עץ?",
    difficulty: "medium",
    options: [
      { text: "5/16", isCorrect: true },
      { text: "3/10", isCorrect: false },
      { text: "1/32", isCorrect: false },
      { text: "5/32", isCorrect: false }
    ],
    explanation:
      "משתמשים בנוסחת הבינום: C(5,3) * 0.5^3 * 0.5^2 = 10 * 0.125 * 0.25 = 10/32 = 5/16."
  },
  {
    id: "confidence-interval",
    text:
      "טווח אמון של 95% לממוצע הוא (18.5, 21.5). מה יקרה אם תעלה את רמת האמון ל-99% עם אותם נתונים?",
    difficulty: "medium",
    options: [
      { text: "הטווח מצטמצם.", isCorrect: false },
      { text: "הטווח מתרחב.", isCorrect: true },
      { text: "הטווח נשאר זהה.", isCorrect: false },
      { text: "הטווח זז כלפי מעלה.", isCorrect: false }
    ],
    explanation:
      "רמות אמון גבוהות יותר דורשות טווח טעות גדול יותר, ולכן הטווח מתרחב."
  },
  {
    id: "central-limit-theorem",
    text:
      "איזה משפט מתאר בצורה הטובה ביותר את משפט הגבול המרכזי (CLT)?",
    difficulty: "medium",
    options: [
      {
        text:
          "התפלגות ממוצעי המדגמים מתקרבת לנורמלית ככל שגודל המדגם גדל.",
        isCorrect: true
      },
      {
        text: "התפלגויות האוכלוסייה נעשות נורמליות ככל ש-n גדל.",
        isCorrect: false
      },
      {
        text: "השונות במדגמים תמיד שווה לשונות באוכלוסייה.",
        isCorrect: false
      },
      {
        text: "שיעורי המדגם תמיד שווים לשיעורי האוכלוסייה.",
        isCorrect: false
      }
    ],
    explanation:
      "משפט הגבול המרכזי קובע שגם אם התפלגות האוכלוסייה איננה נורמלית, התפלגות ממוצעי המדגמים מתקרבת לנורמלית ככל שגודל המדגם גדל."
  },
  {
    id: "hypothesis-testing",
    text:
      "בבדיקת השערות, מהו ערך-p?",
    difficulty: "hard",
    options: [
      {
        text:
          "ההסתברות לצפות בנתונים קיצוניים לפחות כמו במדגם, בהנחה שהשערת האפס נכונה.",
        isCorrect: true
      },
      {
        text: "ההסתברות שהשערת החלופה נכונה.",
        isCorrect: false
      },
      {
        text: "הסיכוי לטעות מסוג ראשון לפני ביצוע המבחן.",
        isCorrect: false
      },
      {
        text: "רמת הביטחון של המבחן.",
        isCorrect: false
      }
    ],
    explanation:
      "ערך-p מודד את ההסתברות לנתונים שלא מתיישבים עם השערת האפס לפחות כמו הנתונים שנצפו, בהנחה שהשערת האפס נכונה."
  },
  {
    id: "type-errors",
    text:
      "אי דחיית השערת אפס שגויה היא דוגמה לאיזה סוג של טעות?",
    difficulty: "hard",
    options: [
      { text: "טעות מסוג ראשון", isCorrect: false },
      { text: "טעות מסוג שני", isCorrect: true },
      { text: "גם טעות מסוג ראשון וגם טעות מסוג שני", isCorrect: false },
      { text: "לא בוצעה טעות", isCorrect: false }
    ],
    explanation:
      "טעות מסוג שני מתרחשת כאשר איננו דוחים את השערת האפס אף על פי שהיא שגויה."
  },
  {
    id: "regression-r2",
    text:
      "ברגרסיה ליניארית פשוטה, מה מייצג מקדם ההסבר (R^2)?",
    difficulty: "medium",
    options: [
      {
        text: "החלק מהשונות במשתנה התלוי שמוסבר על ידי המשתנה המסביר.",
        isCorrect: true
      },
      { text: "השיפוע של קו הרגרסיה.", isCorrect: false },
      { text: "סכום ריבועי השגיאות.", isCorrect: false },
      { text: "המתאם בין השאריות.", isCorrect: false }
    ],
    explanation:
      "R^2 מודד כמה מהשונות במשתנה התלוי מוסברת על ידי המודל הליניארי."
  },
  {
    id: "z-score",
    text:
      "איזה ציון Z מייצג ערך שנמצא שתי סטיות תקן מתחת לממוצע?",
    difficulty: "easy",
    options: [
      { text: "-2", isCorrect: true },
      { text: "2", isCorrect: false },
      { text: "0", isCorrect: false },
      { text: "-1", isCorrect: false }
    ],
    explanation:
      "ציון Z מציין כמה סטיות תקן ערך נמצא מהממוצע. שתי סטיות תקן מתחת לממוצע שוות לערך מינוס 2."
  }
];

export const QUESTIONS_PER_SESSION = 8;
