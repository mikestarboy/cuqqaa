export type Locale = 'en' | 'tr'

export type LandingContent = {
  nav: {
    login: string
    signup: string
    howItWorks: string
  }
  hero: {
    title: string
    subtitle: string
    mini: string
    primaryCta: string
    secondaryCta: string
    scroll: string
    showcase: { title: string; detail: string }[]
  }
  tabs: {
    title: string
    items: { label: string; heading: string; description: string }[]
  }
  stepper: {
    title: string
    steps: string[]
  }
  ctaBand: {
    title: string
    subtitle: string
    button: string
  }
  card: {
    label: string
    title: string
    subtitle: string
    chips: string[]
    link: string
  }
  exchange: {
    title: string
    subtitle: string
    sentLabel: string
    receivedLabel: string
    fromValue: string
    toValue: string
    currencies: string[]
  }
  testimonials: {
    title: string
    items: { quote: string; name: string }[]
  }
  finalCta: {
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
  footer: {
    tagline: string
    links: { label: string; href: string }[]
    meta: string
  }
}

export const landingContent = {
  en: {
    nav: {
      login: 'Log in',
      signup: 'Sign up',
      howItWorks: 'How it works',
    },
    hero: {
      title: 'Cuqqaa: One app, all your payments.',
      subtitle: 'Send, top up, spend — anywhere, in seconds with one account.',
      mini: 'Secure • Fast • Modern',
      primaryCta: 'Get Started',
      secondaryCta: 'How it works',
      scroll: 'Scroll',
      showcase: [
        { title: 'Add', detail: 'Card or bank' },
        { title: 'Send', detail: 'Instant transfers' },
        { title: 'Exchange', detail: 'Live rates' },
      ],
    },
    tabs: {
      title: 'Unify your finances in one place.',
      items: [
        {
          label: 'Add',
          heading: 'Top up with card or bank, instantly.',
          description: 'Bring funds in fast with cards or bank transfers.',
        },
        {
          label: 'Send',
          heading: 'Send instantly, stay in control.',
          description: 'Move money in seconds and keep full visibility.',
        },
        {
          label: 'Exchange',
          heading: 'Convert currencies with one tap.',
          description: 'Switch currencies with transparent rates.',
        },
      ],
    },
    stepper: {
      title: 'Simple. Fast. Secure.',
      steps: [
        '01 Create account',
        '02 Add balance',
        '03 Choose method',
        '04 Confirm',
        '05 Done',
      ],
    },
    ctaBand: {
      title: 'All your finances in one app.',
      subtitle: 'Try Cuqqaa today. Ready in minutes.',
      button: 'Start',
    },
    card: {
      label: 'Cuqqaa Card',
      title: 'Contactless? Yes. Limits? Yes. Card lock? One tap.',
      subtitle: 'Stay in control of daily spending.',
      chips: ['Contactless', 'Limit Control', 'Card Lock'],
      link: 'Learn more',
    },
    exchange: {
      title: 'Instant Exchange.',
      subtitle: 'Convert currencies with clarity and ease.',
      sentLabel: 'Sent',
      receivedLabel: 'Received',
      fromValue: '€10.00',
      toValue: '£8.68',
      currencies: ['EUR', 'GBP', 'USD', 'TRY', 'JPY'],
    },
    testimonials: {
      title: 'What do users say?',
      items: [
        {
          quote: 'Setup is fast and easy to use.',
          name: 'Aylin K.',
        },
        {
          quote: 'Transfers are smooth, the interface is clean.',
          name: 'Mert D.',
        },
        {
          quote: 'Card lock and limit control are perfect.',
          name: 'Selin T.',
        },
      ],
    },
    finalCta: {
      title: 'Join Cuqqaa — start in 30 seconds.',
      subtitle: 'Create your account and make your first transfer right away.',
      primaryCta: 'Create account',
      secondaryCta: 'Log in',
    },
    footer: {
      tagline: 'Minimal, modern finance for daily payments.',
      links: [
        { label: 'Get Started', href: '/signup' },
        { label: 'Log in', href: '/login' },
        { label: 'How it works', href: '#flow' },
      ],
      meta: '© 2025 CUQQAA. All rights reserved.',
    },
  },
  tr: {
    nav: {
      login: 'Giriş',
      signup: 'Üye Ol',
      howItWorks: 'Nasıl Çalışır?',
    },
    hero: {
      title: 'Cuqqaa: Tek uygulama, tüm ödemelerin.',
      subtitle: 'Tek hesapla gönder, ekle, harca — her yerden, saniyeler içinde.',
      mini: 'Güvenli • Hızlı • Modern',
      primaryCta: 'Hemen Başla',
      secondaryCta: 'Nasıl Çalışır?',
      scroll: 'Kaydır',
      showcase: [
        { title: 'Ekle', detail: 'Kart veya banka' },
        { title: 'Gönder', detail: 'Anında transfer' },
        { title: 'Dönüştür', detail: 'Canlı kur' },
      ],
    },
    tabs: {
      title: 'Finansını tek yerde birleştir.',
      items: [
        {
          label: 'Ekle',
          heading: 'Kart/banka ile kolay bakiye ekle.',
          description: 'Kart ya da banka transferi ile hızlıca bakiye yükle.',
        },
        {
          label: 'Gönder',
          heading: 'Anında para gönder, kontrol sende kalsın.',
          description: 'Saniyeler içinde transfer yap, görünürlük sende olsun.',
        },
        {
          label: 'Dönüştür',
          heading: 'Para birimlerini tek dokunuşla çevir.',
          description: 'Kurlar net, dönüşüm tek adımda.',
        },
      ],
    },
    stepper: {
      title: 'Basit. Hızlı. Güvenli.',
      steps: [
        '01 Hesap Oluştur',
        '02 Bakiye Ekle',
        '03 Yöntem Seç',
        '04 Onayla',
        '05 Tamamlandı',
      ],
    },
    ctaBand: {
      title: 'Tüm finansın tek uygulamada.',
      subtitle: 'Cuqqaa’yı bugün dene. Dakikalar içinde hazır.',
      button: 'Başla',
    },
    card: {
      label: 'Cuqqaa Card',
      title: 'Temassız mı? Var. Limit mi? Var. Kart kilidi? Tek dokunuş.',
      subtitle: 'Günlük harcamalarında kontrol sende.',
      chips: ['Temassız', 'Limit Kontrolü', 'Kart Kilitleme'],
      link: 'Daha Fazla',
    },
    exchange: {
      title: 'Anında Dönüştür.',
      subtitle: 'Para birimlerini kolayca çevir, şeffaf görün.',
      sentLabel: 'Gönderilen',
      receivedLabel: 'Alınan',
      fromValue: '€10.00',
      toValue: '£8,68',
      currencies: ['EUR', 'GBP', 'USD', 'TRY', 'JPY'],
    },
    testimonials: {
      title: 'Kullanıcılar ne diyor?',
      items: [
        {
          quote: 'Kurulum hızlı, kullanım rahat.',
          name: 'Aylin K.',
        },
        {
          quote: 'Transferler sorunsuz, arayüz çok temiz.',
          name: 'Mert D.',
        },
        {
          quote: 'Kart kilidi ve limit kontrolü harika.',
          name: 'Selin T.',
        },
      ],
    },
    finalCta: {
      title: 'Cuqqaa’ya katıl — başlamak 30 saniye.',
      subtitle: 'Hesabını oluştur, ilk işlemini hemen yap.',
      primaryCta: 'Hesap Oluştur',
      secondaryCta: 'Giriş',
    },
    footer: {
      tagline: 'Günlük ödemeler için sade ve modern finans.',
      links: [
        { label: 'Üye Ol', href: '/signup' },
        { label: 'Giriş', href: '/login' },
        { label: 'Nasıl Çalışır?', href: '#flow' },
      ],
      meta: '© 2025 CUQQAA. Tüm hakları saklıdır.',
    },
  },
} satisfies Record<Locale, LandingContent>
