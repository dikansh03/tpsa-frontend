export interface PlayerCardData {
  id: string; initials: string; name: string; sport: string[]; centre: string; group: string; sessions: number; totalSessions: number; status: string; tone: 'success' | 'warning' | 'error' | 'purple' | 'neutral'
}
export const samplePlayers: PlayerCardData[] = [
  { id: 'TPSA-0412', initials: 'YR', name: 'Yusuf Rahman', sport: ['Football'], centre: 'Sharjah', group: 'U10 Beginner', sessions: 7, totalSessions: 12, status: 'Active', tone: 'success' },
  { id: 'TPSA-0398', initials: 'SN', name: 'Sara Nair', sport: ['Swimming'], centre: 'Dubai', group: 'Level 2', sessions: 11, totalSessions: 12, status: 'Renewal due', tone: 'warning' },
  { id: 'TPSA-0377', initials: 'AM', name: 'Adam Malik', sport: ['Basketball', 'Football'], centre: 'Ajman', group: 'U12', sessions: 4, totalSessions: 16, status: 'Active', tone: 'success' },
  { id: 'TPSA-0361', initials: 'AQ', name: 'Aisha Qadir', sport: ['Football'], centre: 'Sharjah', group: 'U8', sessions: 0, totalSessions: 8, status: 'Trial', tone: 'purple' },
  { id: 'TPSA-0344', initials: 'HY', name: 'Hamdan Yusuf', sport: ['Football'], centre: 'Sharjah', group: 'U11 Advanced', sessions: 9, totalSessions: 12, status: 'Active', tone: 'success' },
  { id: 'TPSA-0332', initials: 'DA', name: 'Dana Aziz', sport: ['Swimming'], centre: 'Dubai', group: 'Level 1', sessions: 8, totalSessions: 8, status: 'Overdue', tone: 'error' },
  { id: 'TPSA-0318', initials: 'KT', name: 'Karim Tariq', sport: ['Basketball'], centre: 'Ajman', group: 'U13', sessions: 6, totalSessions: 16, status: 'Active', tone: 'success' },
  { id: 'TPSA-0301', initials: 'LF', name: 'Lina Farouk', sport: ['Swimming'], centre: 'Sharjah', group: 'Toddlers', sessions: 2, totalSessions: 12, status: 'Waitlist', tone: 'neutral' },
  { id: 'TPSA-0287', initials: 'OH', name: 'Omar Hassan', sport: ['Basketball'], centre: 'Ajman', group: 'U13', sessions: 13, totalSessions: 20, status: 'Active', tone: 'success' },
  { id: 'TPSA-0274', initials: 'MK', name: 'Mariam Khan', sport: ['Swimming', 'Basketball'], centre: 'Dubai', group: 'Level 3', sessions: 17, totalSessions: 20, status: 'Renewal due', tone: 'warning' },
  { id: 'TPSA-0259', initials: 'RS', name: 'Rayan Saleh', sport: ['Swimming'], centre: 'Ajman', group: 'Level 2', sessions: 3, totalSessions: 12, status: 'Active', tone: 'success' },
  { id: 'TPSA-0243', initials: 'NI', name: 'Noor Iqbal', sport: ['Basketball'], centre: 'Dubai', group: 'U14', sessions: 10, totalSessions: 16, status: 'Active', tone: 'success' },
]
