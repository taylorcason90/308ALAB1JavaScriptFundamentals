const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  function getLearnerData(course, ag, submissions) {
    const result = [];
    submissions.forEach(submission => {
      const learnerId = submission.learner_id;
      let learnerData = result.find(data => data.id === learnerId);
      if (!learnerData) {
        learnerData = {
          id: learnerId,
          avg: 0,
          assignments: {}
        };
        result.push(learnerData);
      }
      const assignment = ag.assignments.find(a => a.id === submission.assignment_id);
      // Check for late submission and calculate the penalty
      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submission.submitted_at);
      const daysLate = Math.max(0, Math.ceil((submittedDate - dueDate) / (1000 * 60 * 60 * 24)));
      const latePenalty = daysLate * 5; // Penalty of 5 points per day
      // Update learner data with assignment details
      learnerData.assignments[submission.assignment_id] =
        (submission.submission.score - latePenalty) / assignment.points_possible;
    });
    // Calculate average for each learner
    result.forEach(learner => {
      const assignmentCount = Object.keys(learner.assignments).length;
      const totalAssignmentScore = Object.values(learner.assignments).reduce((acc, score) => acc + score, 0);
      learner.avg = totalAssignmentScore / assignmentCount;
    });
    return result;
  }
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);