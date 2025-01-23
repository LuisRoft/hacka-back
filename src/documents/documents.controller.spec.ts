import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { NotificationService } from '../notification/notification.service';

describe('DocumentsController', () => {
  let documentsController: DocumentsController;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            sendEmailWithTemplate: jest.fn(), // Mock del método del servicio
          },
        },
      ],
    }).compile();

    documentsController = module.get<DocumentsController>(DocumentsController);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('debería estar definido', () => {
    expect(documentsController).toBeDefined();
  });

  describe('sendDocument', () => {
    it('debería llamar a NotificationService.sendEmailWithTemplate con los parámetros correctos', async () => {
      // Arrange: datos de prueba
      const document = {
        title: 'Contrato de Trabajo',
        collaborator_email: 'johannescv417@gmail.com',
      };
      const sendEmailWithTemplateSpy = jest.spyOn(
        notificationService,
        'sendEmailWithTemplate',
      );

      // Act: llamamos al método que queremos probar
      await documentsController.sendDocument(document);

      // Assert: verificamos que NotificationService fue llamado correctamente
      expect(sendEmailWithTemplateSpy).toHaveBeenCalledWith(
        document.collaborator_email,
        'Documento Enviado', // Asunto
        {
          title: document.title,
          email: document.collaborator_email,
        },
      );
    });

    it('debería devolver el mensaje de éxito', async () => {
      // Arrange: datos de prueba
      const document = {
        title: 'Contrato de Trabajo',
        collaborator_email: 'johannescv417@gmail.com',
      };

      // Act: llamamos al método que queremos probar
      const result = await documentsController.sendDocument(document);

      // Assert: verificamos la respuesta
      expect(result).toEqual({
        message: 'Documento enviado y notificación enviada.',
      });
    });
  });
});
