import { PlanLevel } from '../../../core/models/tier-system.model';
import { FornecedoresData } from './fornecedores-data';

describe('FornecedoresData mapping', () => {
  const service = Object.create(FornecedoresData.prototype) as any;

  describe('_resolvePlanLevel', () => {
    it('should resolve named string plan levels (case-insensitive)', () => {
      expect(service._resolvePlanLevel({ planLevel: 'Vitrine' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ planLevel: 'VITRINE' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ planLevel: 'vitrine' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ planLevel: 'premium' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ planLevel: 'free' })).toBe(PlanLevel.Free);
      expect(service._resolvePlanLevel({ PlanLevel: 'Zombie' })).toBe(PlanLevel.Zombie);
    });

    it('should resolve numeric plan levels', () => {
      expect(service._resolvePlanLevel({ planLevel: 1 })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ planLevel: 0 })).toBe(PlanLevel.Free);
      expect(service._resolvePlanLevel({ planLevel: -1 })).toBe(PlanLevel.Low);
      expect(service._resolvePlanLevel({ planLevel: -2 })).toBe(PlanLevel.Zombie);
    });

    it('should resolve planLevel from alternative field names (tier, plan)', () => {
      expect(service._resolvePlanLevel({ tier: 1 })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ tier: 'vitrine' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ plan: 'free' })).toBe(PlanLevel.Free);
    });

    it('should infer Vitrine from whatsApp signal when planLevel is absent', () => {
      expect(service._resolvePlanLevel({ whatsApp: '5519999999999' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ whatsAppUrl: 'https://wa.me/1' })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ showContactForm: false })).toBe(PlanLevel.Vitrine);
    });

    it('should fall back to destaque when no other signals present', () => {
      expect(service._resolvePlanLevel({ destaque: true })).toBe(PlanLevel.Vitrine);
      expect(service._resolvePlanLevel({ destaque: false })).toBe(PlanLevel.Free);
      expect(service._resolvePlanLevel({})).toBe(PlanLevel.Free);
    });
  });

  describe('_mapDetailToFornecedor', () => {
    it('should map English address and business hours aliases (spec format)', () => {
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

    it('should map Portuguese field names (endereco, horarioFuncionamento)', () => {
      const fornecedor = service._mapDetailToFornecedor({
        id: 'xyz-456',
        nome: 'Buffet Silva',
        cidade: 'Piracicaba',
        endereco: 'Av. Principal, 200',
        horarioFuncionamento: 'Seg-Sex 09h-17h',
        planLevel: 1
      });

      expect(fornecedor.endereco).toBe('Av. Principal, 200');
      expect(fornecedor.horarioFuncionamento).toBe('Seg-Sex 09h-17h');
      expect(fornecedor.planLevel).toBe(PlanLevel.Vitrine);
    });

    it('should map logradouro alias to endereco', () => {
      const fornecedor = service._mapDetailToFornecedor({
        logradouro: 'Rua das Flores, 10'
      });
      expect(fornecedor.endereco).toBe('Rua das Flores, 10');
    });

    it('should map horario alias to horarioFuncionamento', () => {
      const fornecedor = service._mapDetailToFornecedor({
        horario: 'Seg-Sab 08h-20h'
      });
      expect(fornecedor.horarioFuncionamento).toBe('Seg-Sab 08h-20h');
    });

    it('should convert raw whatsApp number to whatsAppUrl', () => {
      const fornecedor = service._mapDetailToFornecedor({
        planLevel: 1,
        whatsApp: '5519988887777'
      });
      expect(fornecedor.whatsAppUrl).toContain('wa.me');
      expect(fornecedor.whatsAppUrl).toContain('5519988887777');
    });

    it('should keep a full whatsApp URL as-is', () => {
      const fornecedor = service._mapDetailToFornecedor({
        planLevel: 1,
        whatsAppUrl: 'https://wa.me/5519988887777'
      });
      expect(fornecedor.whatsAppUrl).toBe('https://wa.me/5519988887777');
    });

    it('should map coverPictureUrl and profilePictureUrl from spec', () => {
      const fornecedor = service._mapDetailToFornecedor({
        planLevel: 1,
        coverPictureUrl: 'https://cdn.example.com/capa.webp',
        profilePictureUrl: 'https://cdn.example.com/logo.webp'
      });
      expect(fornecedor.coverPictureUrl).toBe('https://cdn.example.com/capa.webp');
      // profilePictureUrl added to imagens as primary
      expect(fornecedor.imagens.length).toBeGreaterThan(0);
    });

    it('should map testimonials from English spec format (brideName, comment)', () => {
      const fornecedor = service._mapDetailToFornecedor({
        planLevel: 1,
        testimonials: [
          { id: 't1', brideName: 'Maria Silva', rating: 5, comment: 'Ótimo trabalho!' }
        ]
      });
      expect(fornecedor.depoimentos?.length).toBe(1);
      expect(fornecedor.depoimentos![0].casal).toBe('Maria Silva');
      expect(fornecedor.depoimentos![0].texto).toBe('Ótimo trabalho!');
    });

    it('should map gallery images with ordem fallback for orderIndex', () => {
      const fornecedor = service._mapDetailToFornecedor({
        planLevel: 1,
        gallery: [
          { id: 'img1', url: 'https://cdn.example.com/img1.jpg', ordem: 2 },
          { id: 'img2', url: 'https://cdn.example.com/img2.jpg', ordem: 1 }
        ]
      });
      expect(fornecedor.imagens.length).toBe(2);
      expect(fornecedor.imagens[0].orderIndex).toBe(1); // sorted ascending
    });
  });
});
