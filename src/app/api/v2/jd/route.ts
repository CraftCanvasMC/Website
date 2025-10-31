import { JenkinsError, getLatestBuild } from '~/lib/jenkins';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const versionParam = searchParams.get('version');
    const experimentalParam = searchParams.get('experimental') === 'true';

    const build = await getLatestBuild(!experimentalParam);

    const mcVer = versionParam ?? build?.minecraftVersion;

    const jdUrl = `https://maven.canvasmc.io/javadoc/snapshots/io/canvasmc/canvas/canvas-api/${mcVer}-R0.1-SNAPSHOT`;

    return NextResponse.redirect(jdUrl, 302);
  } catch (error) {
    if (error instanceof JenkinsError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
