import { PlanLevel } from '../../../core/models/tier-system.model';
import { FornecedoresData } from './fornecedores-data';

describe('FornecedoresData mapping', () => {
  const service = Object.create(FornecedoresData.prototype) as any;

  it('should resolve named plan levels from backend payload', () => {
    expect(service._resolvePlanLevel({ planLevel: 'Vitrine' })).toBe(PlanLevel.Vitrine);
    expect(service._resolvePlanLevel({ planLevel: 'free' })).toBe(PlanLevel.Free);
    expect(service._resolvePlanLevel({ PlanLevel: 'Zombie' })).toBe(PlanLevel.Zombie);
  });

  it('should map address and business hours aliases for supplier detail', () => {
    const fornecedor = service._mapDetailToFornecedor({
      id: 'abc-123',
      name: 'Fornecedor Premium',
      city: 'Piracicaba',
      address: 'Rua Teste, 100',
      businessHours: 'Seg-Sex 08h-18h',
      phone: '(19) 99999-0000',
      planLevel: 'Vitrine',
      gallery: [{ id: 'img-1', url: 'https://cdn.example.com/foto.jpg', orderIndex: 0 }]
    });

    expect(fornecedor.nome).toBe('Fornecedor Premium');
    expect(fornecedor.cidade).toBe('Piracicaba');
    expect(fornecedor.endereco).toBe('Rua Teste, 100');
    expect(fornecedor.horarioFuncionamento).toBe('Seg-Sex 08h-18h');
    expect(fornecedor.telefone).toBe('(19) 99999-0000');
    expect(fornecedor.planLevel).toBe(PlanLevel.Vitrine);
  });
});
