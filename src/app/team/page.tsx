import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { GradientBackground } from '~/components/ui/gradient-background';

type TeamMember = {
  name: string;
  role: string;
  github?: string;
};

type TeamSection = {
  description: string;
  members: TeamMember[];
};

const TEAM_MEMBERS: Record<string, TeamSection> = {
  'Leadership Team': {
    description: 'The core team driving Canvas forward.',
    members: [
      {
        name: 'Dueris',
        github: 'Dueris',
        role: 'Founder',
      },
    ],
  },
  'Development Team': {
    description: 'Key contributors actively developing and maintaining the project.',
    members: [
      {
        name: 'feenko',
        github: 'feenko',
        role: 'Web Developer',
      },
      {
        name: 'Ventitoja',
        github: 'Ventitoja',
        role: 'Web Developer',
      },
    ],
  },
  'Infrastructure Team': {
    description: 'The team responsible for maintaining our hosting infrastructure and build systems.',
    members: [
      {
        name: 'MrMasrozYTLIVE',
        github: 'MrMasrozYTLIVE',
        role: 'Jenkins Host',
      },
      {
        name: 'Nukkay',
        role: 'Website Host',
      },
    ],
  },
};

function TeamMember({ name, role, github }: TeamMember) {
  const CardContent = () => (
    <div className='flex items-center gap-4'>
      <Avatar className='h-12 w-12'>
        <AvatarImage src={`https://github.com/${github}.png`} alt={`${name}'s avatar`} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className='font-semibold text-white'>{name}</h3>
        <p className='text-neutral-400 text-sm'>{role}</p>
      </div>
    </div>
  );

  if (!github) {
    return (
      <Card className='p-5'>
        <CardContent />
      </Card>
    );
  }

  return (
    <a href={`https://github.com/${github}`} target='_blank' rel='noopener noreferrer'>
      <Card className='p-5 transition-all hover:bg-neutral-800/50 hover:ring-1 hover:ring-neutral-700'>
        <CardContent />
      </Card>
    </a>
  );
}

function Contributor({ url, avatar, username }: { url: string; avatar: string; username: string }) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className='group'>
      <Avatar className='h-16 w-16 ring-1 ring-neutral-600 transition group-hover:ring-neutral-400'>
        <AvatarImage src={avatar} alt={`${username}'s GitHub profile`} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
    </a>
  );
}

export default async function TeamPage() {
  const repos = ['Canvas', 'Website', 'Docs'];
  const responses = await Promise.all(
    repos.map(repo =>
      fetch(`https://api.github.com/repos/CraftCanvasMC/${repo}/contributors`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
    ),
  );

  if (responses.some(res => !res.ok)) {
    throw new Error('Failed to fetch contributors', { cause: responses });
  }

  const contributorMap = new Map();

  // process all responses and aggregate contributions
  const contributorsData = await Promise.all(responses.map(res => res.json()));
  for (const contributors of contributorsData) {
    for (const contributor of contributors) {
      // skip gh actions bot
      if (contributor.login === 'github-actions[bot]') continue;

      const currentContributions = contributorMap.get(contributor.login)?.contributions || 0;
      contributorMap.set(contributor.login, {
        ...contributor,
        contributions: currentContributions + (contributor.contributions || 0),
      });
    }
  }

  // convert map to array and sort by contributions
  const contributors = Array.from(contributorMap.values()).sort((a, b) => {
    const diff = b.contributions - a.contributions;
    // if contributions are equal, sort alphabetically by login as secondary criteria
    return diff !== 0 ? diff : a.login.localeCompare(b.login);
  });

  return (
    <div className='relative min-h-screen'>
      <GradientBackground />

      <div className='mx-auto max-w-7xl px-6 py-16 pb-32 sm:px-8 sm:py-20 sm:pb-40 lg:px-12'>
        <header className='mx-auto max-w-3xl text-center'>
          <h1 className='font-bold text-3xl sm:text-4xl lg:text-5xl'>Meet the Team behind CanvasMC</h1>
          <p className='mt-4 text-neutral-300 sm:text-lg'>
            Our talented team and community contributors work together to develop and maintain CanvasMC, bringing you a
            faster and more efficient Minecraft server experience.
          </p>

          <div className='mt-6'>
            <Button size='lg' asChild>
              <a
                href='https://github.com/CraftCanvasMC'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2'
                aria-label='Visit our GitHub (opens in new tab)'
              >
                <svg viewBox='0 0 24 24' className='h-4 w-4' fill='currentColor' aria-hidden='true'>
                  <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
                </svg>
                <span className='text-sm sm:text-base'>Visit our GitHub</span>
              </a>
            </Button>
          </div>
        </header>

        {Object.entries(TEAM_MEMBERS).map(
          ([teamName, { description, members }]) =>
            members.length > 0 && (
              <section key={teamName} className='mt-12 sm:mt-16' aria-labelledby={`${teamName.toLowerCase()}-heading`}>
                <h2 id={`${teamName.toLowerCase()}-heading`} className='font-semibold text-2xl text-white'>
                  {teamName}
                </h2>
                <p className='mt-2 mb-6 text-neutral-300'>{description}</p>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {members.map(member => (
                    <TeamMember key={member.name} {...member} />
                  ))}
                </div>
              </section>
            ),
        )}

        <section className='mt-12 sm:mt-16' aria-labelledby='contributors-heading'>
          <h2 id='contributors-heading' className='font-semibold text-2xl text-white'>
            Contributors
          </h2>
          <p className='mt-2 mb-6 text-neutral-300'>Our amazing contributors who help make CanvasMC better.</p>
          <div className='flex flex-wrap gap-4'>
            {contributors.map((contributor: { login: string; avatar_url: string; html_url: string }) => (
              <Contributor
                key={contributor.login}
                url={contributor.html_url}
                avatar={contributor.avatar_url}
                username={contributor.login}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
