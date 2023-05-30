import { unique } from './common.ts';

const now = new Date();

/** Get and parse messages from git log */
export async function getGitLog(pagePath: string): Promise<{
  date: Date;
  updated: Date | null;
  author: string | undefined;
  contributors: string[];
}> {
  const gitLogResult: any = {};

  const gitLogAuthorProcess = Deno.run({
    // https://stackoverflow.com/a/36561814/2777142
    cmd: ['git', 'log', '--follow', '--format=%an', '--', pagePath],
    stdout: 'piped',
    stderr: 'piped',
  });
  const gitLogAuthorOutput = await gitLogAuthorProcess.output(); // "piped" must be set
  const gitLogAuthor = new TextDecoder().decode(gitLogAuthorOutput).trim();
  gitLogAuthorProcess.stderr.close();
  gitLogAuthorProcess.close();

  if (gitLogAuthor === '') {
    gitLogResult.author = undefined;
    gitLogResult.contributors = [];
  } else {
    let contributors = gitLogAuthor.split('\n').reverse();
    gitLogResult.author = contributors[0];
    gitLogResult.contributors = unique(contributors);
  }

  const gitLogDateProcess = Deno.run({
    // https://stackoverflow.com/a/36561814/2777142
    cmd: ['git', 'log', '--follow', '--format=%ad', '--', pagePath],
    stdout: 'piped',
    stderr: 'piped',
  });
  const gitLogDateOutput = await gitLogDateProcess.output(); // "piped" must be set
  const gitLogDate = new TextDecoder().decode(gitLogDateOutput).trim();
  // Will throw error if not close stderr:
  // AssertionError: Test case is leaking resources.
  gitLogDateProcess.stderr.close();
  gitLogDateProcess.close();

  if (gitLogDate === '') {
    gitLogResult.date = now;
    gitLogResult.updated = null;
  } else {
    const dateList = gitLogDate.split('\n').reverse();
    if (dateList.length === 1) {
      gitLogResult.date = new Date(dateList[0]);
      gitLogResult.updated = null;
    } else {
      gitLogResult.date = new Date(dateList[0]);
      gitLogResult.updated = new Date(dateList[dateList.length - 1]);
    }
  }

  return gitLogResult;
}

export async function getGitBranch() {
  const gitBranchProcess = Deno.run({
    // https://stackoverflow.com/a/36561814/2777142
    cmd: ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
    stdout: 'piped',
    stderr: 'piped',
  });
  const gitBranchOutput = await gitBranchProcess.output(); // "piped" must be set
  const gitBranch = new TextDecoder().decode(gitBranchOutput).trim();
  gitBranchProcess.stderr.close();
  gitBranchProcess.close();

  return gitBranch;
}
