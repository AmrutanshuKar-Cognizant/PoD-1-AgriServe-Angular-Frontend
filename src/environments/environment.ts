export const environment = {
  production: false,
  apiEndpoints: {
    auth: {
      baseUrl: 'http://localhost:8081/auth',
      login: 'http://localhost:8081/auth/login',
      register: 'http://localhost:8081/auth/register',
      logout: 'http://localhost:8081/auth/logout',
    },
    trainingPrograms: {
      baseUrl: 'http://localhost:8081/api/programs',
      createProgram: 'http://localhost:8081/api/programs',
      getAllPrograms: 'http://localhost:8081/api/programs',
      getProgramById: 'http://localhost:8081/api/programs/{id}',
      updateProgram: 'http://localhost:8081/api/programs/{id}',
      deleteProgram: 'http://localhost:8081/api/programs/{id}',
      getCompletedPrograms: 'http://localhost:8081/api/programs/completed',
      checkProgramExists: 'http://localhost:8081/api/programs/{id}/exists',
    },
    workshops: {
      baseUrl: 'http://localhost:8081/api/workshops',
      scheduleWorkshop: 'http://localhost:8081/api/workshops',
      getAllWorkshops: 'http://localhost:8081/api/workshops',
      getActiveWorkshops: 'http://localhost:8081/api/workshops/active',
      updateWorkshop: 'http://localhost:8081/api/workshops/{id}',
      updateWorkshopStatus: 'http://localhost:8081/api/workshops/{id}/status',
      deleteWorkshop: 'http://localhost:8081/api/workshops/{id}',
      getWorkshopsByOfficer: 'http://localhost:8081/api/workshops/officer/{officerId}',
    },
    participation: {
      baseUrl: 'http://localhost:8081/api/participations',
      registerForWorkshop: 'http://localhost:8081/api/participations/register',
      getParticipantsForWorkshop: 'http://localhost:8081/api/participations/workshop/{workshopId}',
      getParticipationByFarmerId: 'http://localhost:8081/api/participations/farmer/{farmerId}',
      updateAttendance: 'http://localhost:8081/api/participations/attendance',
    },
    advisoryContent: {
      baseUrl: 'http://localhost:8081/api/advisory-content',
      uploadContent: 'http://localhost:8081/api/advisory-content/upload',
      getActiveContent: 'http://localhost:8081/api/advisory-content/active',
      deleteContent: 'http://localhost:8081/api/advisory-content/{id}',
    },
    advisorySessions: {
      baseUrl: 'http://localhost:8081/api/advisory-sessions',
      logSession: 'http://localhost:8081/api/advisory-sessions/log',
      getAllSessions: 'http://localhost:8081/api/advisory-sessions',
      getFarmerHistory: 'http://localhost:8081/api/advisory-sessions/history/{farmerId}',
      getUsageReport: 'http://localhost:8081/api/advisory-sessions/reports/usage',
      getSessionById: 'http://localhost:8081/api/advisory-sessions/{id}',
      verifySessionExists: 'http://localhost:8081/api/advisory-sessions/{sessionId}/exists',
    },
    feedback: {
      baseUrl: 'http://localhost:8081/api/feedback',
      submitFeedback: 'http://localhost:8081/api/feedback/submit',
      getAllFeedback: 'http://localhost:8081/api/feedback/all',
    },
    satisfactionMetrics: {
      baseUrl: 'http://localhost:8081/api/satisfaction-metrics',
      evaluateProgram: 'http://localhost:8081/api/satisfaction-metrics/evaluate',
    },
  },
};
 
 