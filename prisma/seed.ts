import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo-tenant' },
    update: {},
    create: { name: 'Demo Tenant', slug: 'demo-tenant' },
  });

  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      passwordHash,
      tenantId: tenant.id,
      role: 'TENANT_ADMIN',
    },
  });

  const outcome = await prisma.outcome.create({
    data: {
      tenantId: tenant.id,
      name: 'Increase Conversion',
      description: 'Optimize for higher checkout conversion',
    },
  });

  await prisma.dynamicPricingRule.create({
    data: {
      tenantId: tenant.id,
      outcomeId: outcome.id,
      basePrice: 99,
      rules: { multiplier: 1.0 },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
