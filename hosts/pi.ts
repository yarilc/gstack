import type { HostConfig } from '../scripts/host-config';

const pi: HostConfig = {
  name: 'pi',
  displayName: 'Pi',
  cliCommand: 'pi',
  cliAliases: [],

  globalRoot: '.pi/agent/skills/gstack',
  localSkillRoot: '.pi/skills/gstack',
  hostSubdir: '.pi',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    descriptionLimit: 1024,
    descriptionLimitBehavior: 'warn',
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'],
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.pi/agent/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.pi/skills/gstack' },
    { from: '.claude/skills', to: '.pi/skills' },
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],

  toolRewrites: {
    'use the Bash tool': 'use the bash tool',
    'use the Write tool': 'use the write tool',
    'use the Read tool': 'use the read tool',
    'use the Edit tool': 'use the edit tool',
    'use the Grep tool': 'use the grep tool',
    'use the Glob tool': 'use the find tool',
    'use the Agent tool': 'use a sub-agent',
    'Use the Grep tool': 'Use the grep tool',
    'Use the Bash tool': 'Use the bash tool',
    'Use the Write tool': 'Use the write tool',
    'Use the Read tool': 'Use the read tool',
    'Use the Edit tool': 'Use the edit tool',
    'the Agent tool is unavailable': 'sub-agent dispatch is unavailable',
    'the Agent tool with': 'a sub-agent with',
    'using the Agent tool': 'using a sub-agent',
    '(via Agent tool)': '(via sub-agent)',
    '(Agent tool': '(sub-agent',
    'foreground Agent tool)': 'foreground sub-agent)',
    'Use the Agent tool to dispatch': 'Dispatch',
    "Claude Code's Agent tool": 'a sub-agent',
    'the Bash tool': 'the bash tool',
    'the Read tool': 'the read tool',
    'the Write tool': 'the write tool',
    'the Edit tool': 'the edit tool',
    'the Grep tool': 'the grep tool',
  },

  suppressedResolvers: [
    'DESIGN_OUTSIDE_VOICES',
    'ADVERSARIAL_STEP',
    'CODEX_SECOND_OPINION',
    'CODEX_PLAN_REVIEW',
    'REVIEW_ARMY',
    'GBRAIN_CONTEXT_LOAD',
    'GBRAIN_SAVE_RESULTS',
  ],

  runtimeRoot: {
    globalSymlinks: ['bin', 'browse/dist', 'browse/bin', 'gstack-upgrade', 'ETHOS.md'],
    globalFiles: {
      'review': ['checklist.md', 'TODOS-format.md'],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'copy',
    namePrefix: 'gstack-',
  },

  coAuthorTrailer: 'Co-Authored-By: Pi Agent <agent@pi.dev>',
  learningsMode: 'basic',
};

export default pi;
