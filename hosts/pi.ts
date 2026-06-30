import type { HostConfig } from '../scripts/host-config';

/**
 * Directive appended to every `pi --tools` sub-agent dispatch instruction.
 * Mirrors the pattern from /code-review-skeptical.md: lets the user opt into
 * a specific provider/model/thinking level per dispatch.
 */
const MODEL_DIRECTIVE =
  ' (if the user specifies a model, use `--provider`, `--thinking` and `--model` accordingly)';

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
    // ── Real sub-agent dispatches: "Agent tool" → "pi --tools" ──────────
    // Order matters: applyHostRewrites runs replaceAll in insertion order,
    // so these specific phrases MUST come before the catch-all rewrites
    // below (e.g., 'using the Agent tool', 'the Agent tool with') that would
    // otherwise intercept them and lose the pi --tools mechanism.
    'using the Agent tool with `subagent_type: "general-purpose"`':
      `using \`pi --tools read,grep,find,ls --print\`${MODEL_DIRECTIVE}`,
    'Use the Agent\ntool with `subagent_type: "general-purpose"` for each variant':
      `Use \`pi --tools read,grep,find,ls --print\` for each variant${MODEL_DIRECTIVE}`,
    'Launch N Agent subagents in a single message':
      `Launch N sub-agents in parallel (one \`pi --tools\` call each; if the user specifies a model, use \`--provider\`, \`--thinking\` and \`--model\` accordingly)`,
    'launch an independent verification sub-task using the Agent tool':
      `launch an independent verification sub-task using \`pi --tools read,grep,find,ls --print\`${MODEL_DIRECTIVE}`,
    'Use the Agent tool to dispatch an independent reviewer':
      `Use \`pi --tools read,grep,find,ls --print\` to dispatch an independent reviewer${MODEL_DIRECTIVE}`,
    'Dispatch via the Agent tool with the same prompt':
      `Dispatch via \`pi --tools read,grep,find,ls --print\` with the same prompt${MODEL_DIRECTIVE}`,

    // ── Catch-all tool name rewrites (after the specific dispatches above) ──
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
