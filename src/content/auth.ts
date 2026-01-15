import type { Locale } from './landing'

export const authContent: Record<Locale, {
  nav: {
    back: string
    login: string
    signup: string
  }
  login: {
    title: string
    subtitle: string
    email: string
    password: string
    remember: string
    primaryCta: string
    secondaryCta: string
    helper: string
    aside: {
      label: string
      value: string
      helper: string
      stat: string
    }
  }
  signup: {
    title: string
    subtitle: string
    name: string
    email: string
    password: string
    agreement: string
    primaryCta: string
    secondaryCta: string
    aside: {
      label: string
      value: string
      helper: string
      stat: string
    }
  }
}> = {
  en: {
    nav: {
      back: 'Back to home',
      login: 'Log in',
      signup: 'Sign up',
    },
    login: {
      title: 'Welcome back.',
      subtitle: 'Access your Cuqqaa account in seconds.',
      email: 'Email address',
      password: 'Password',
      remember: 'Remember me',
      primaryCta: 'Log in',
      secondaryCta: 'Create account',
      helper: 'Forgot password?',
      aside: {
        label: 'Cuqqaa Pay',
        value: '€4,921.22',
        helper: 'Instant balance view',
        stat: 'Secure by design',
      },
    },
    signup: {
      title: 'Create your account.',
      subtitle: 'Start with Cuqqaa in just a few steps.',
      name: 'Full name',
      email: 'Email address',
      password: 'Password',
      agreement: 'I agree to the Terms & Privacy Policy',
      primaryCta: 'Sign up',
      secondaryCta: 'Already have an account?',
      aside: {
        label: 'Cuqqaa Card',
        value: 'Active',
        helper: 'Control your limits',
        stat: 'Instant approvals',
      },
    },
  },
  tr: {
    nav: {
      back: 'Ana sayfaya dön',
      login: 'Giriş',
      signup: 'Üye Ol',
    },
    login: {
      title: 'Tekrar hoş geldin.',
      subtitle: 'Cuqqaa hesabına saniyeler içinde gir.',
      email: 'E-posta adresi',
      password: 'Şifre',
      remember: 'Beni hatırla',
      primaryCta: 'Giriş yap',
      secondaryCta: 'Hesap oluştur',
      helper: 'Şifreni mi unuttun?',
      aside: {
        label: 'Cuqqaa Pay',
        value: '€4.921,22',
        helper: 'Anlık bakiye görünümü',
        stat: 'Güvenli tasarım',
      },
    },
    signup: {
      title: 'Hesabını oluştur.',
      subtitle: 'Cuqqaa için sadece birkaç adım yeter.',
      name: 'Ad Soyad',
      email: 'E-posta adresi',
      password: 'Şifre',
      agreement: 'Kullanım şartlarını ve gizlilik politikasını kabul ediyorum',
      primaryCta: 'Üye ol',
      secondaryCta: 'Zaten hesabın var mı?',
      aside: {
        label: 'Cuqqaa Card',
        value: 'Aktif',
        helper: 'Limitlerini kontrol et',
        stat: 'Anında onaylar',
      },
    },
  },
}
