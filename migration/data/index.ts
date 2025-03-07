export const initSubject = [
  { name: 'Mathématiques', levelId: 3 },
  { name: 'Français', levelId: 2 },
  { name: 'Sciences et vie de la Terre', levelId: 3 },
  { name: 'Histoire-Géographie', levelId: 2 },
  { name: 'Education civique', levelId: 4 },
  { name: 'Langue vivante étrangère', levelId: 3 },
  { name: 'Arts plastiques', levelId: 1 },
  { name: 'Education physique et sportive', levelId: 1 },
  { name: 'Technologie', levelId: 5 },
  { name: 'Musique', levelId: 5 },
  { name: 'Informatique', levelId: 4 },
  { name: 'Technologie', levelId: 4 },
];

export const initLevel = [
  { name: 'Elémentaire' },
  { name: 'Maternelle' },
  { name: 'Collège' },
  { name: 'Lycée' },
  { name: 'Université' },
];

export const formatStringToSql = (str: string | undefined | null): string =>
  str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
