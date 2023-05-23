const EditProblemLogState = (function () {
  let problemId: number;
  let problemName: string;
  let problemUrl: string;
  let problemDifficulty: number;

  const getProblemId = () => {
    return problemId;
  }

  const getProblemName = () => {
    return problemName;
  };

  const getProblemUrl = () => {
    return problemUrl;
  };

  const getProblemDifficulty = () => {
    return problemDifficulty;
  };

  const setProblemId = (id: number) => {
    problemId = id;
  }

  const setProblemName = (name: string) => {
    problemName = name;
  };

  const setProblemUrl = (url: string) => {
    problemUrl = url;
  };

  const setProblemDifficulty = (difficulty: number) => {
    problemDifficulty = difficulty;
  };


  return {
    getProblemId: getProblemId,
    getProblemName: getProblemName,
    getProblemUrl: getProblemUrl,
    getProblemDifficulty: getProblemDifficulty,
    setProblemId: setProblemId,
    setProblemName: setProblemName,
    setProblemUrl: setProblemUrl,
    setProblemDifficulty: setProblemDifficulty
  };
})();

export default EditProblemLogState;