import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/mercedesromeroweb/', icon: 'bi-instagram' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61586554689664', icon: 'bi-facebook' },
    { name: 'Twitter/X', url: 'https://x.com/RomeroPelis', icon: 'bi-twitter-x' }
  ];

  downloadFile(fileName: string): void {
    const content = this.getFileContent(fileName);
    const blob = new Blob([content], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private getFileContent(fileName: string): string {
    return '%PDF-1.4\n%âãÏÓ\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 100 700 Td (Documento) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000202 00000 n\ntrailer\n<< /Root 1 0 R /Size 5 >>\nstartxref\n294\n%%EOF';
  }
}