import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'صفحه اصلی',
    url: '/dashboard',
    icon: 'icon-speedometer',
    roleTypes: null
  },
  {
    name: 'جستجوی فرش',
    url: '/dashboard/farshboombank',
    icon: 'icon-drop',
    roleTypes: null
  },
  {
    name: 'گونه های فرش',
    url: '/dashboard/content/1',
    icon: 'icon-pencil',
    roleTypes: null
  },
  {
    name: 'شناخت فرش',
    url: '',
    icon: 'icon-puzzle',
    roleTypes: null,
    children: [
      {
        name: 'راهنمای فرش',
        url: '/dashboard/content/2',
        icon: 'icon-puzzle'
      },
      {
        name: 'مواد اولیه فرش',
        url: '/dashboard/content/3',
        icon: 'icon-puzzle'
      },
      {
        name: 'رنگرزی',
        url: '/dashboard/content/4',
        icon: 'icon-puzzle'
      },
      {
        name: 'فرشهای عتیق',
        url: '/dashboard/content/5',
        icon: 'icon-puzzle'
      },
      {
        name: 'نقشه ها و نقش ها',
        url: '/dashboard/content/6',
        icon: 'icon-puzzle'

      },
      {
        name: 'دستگاه های بافندگی',
        url: '/dashboard/content/7',
        icon: 'icon-puzzle'
      },
      {
        name: 'حمایت از بافندگان',
        url: '/dashboard/content/8',
        icon: 'icon-puzzle'
      },
      {
        name: 'فرش،ایرانی ترین کالا',
        url: '/dashboard/content/9',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'اطلاعات فرش',
    url: '',
    icon: 'icon-cursor',
    roleTypes: null,
    children: [
      {
        name: 'تنوع گونه',
        url: '/dashboard/content/10',
        icon: 'icon-cursor'
      },
      {
        name: 'ارزش اقتصادی',
        url: '/dashboard/content/11',
        icon: 'icon-cursor'
      },
      {
        name: 'شناسنامه معتبر',
        url: '/dashboard/content/12',
        icon: 'icon-cursor'
      },
      {
        name: 'اطلاعات فنی',
        url: '/dashboard/content/13',
        icon: 'icon-cursor'
      },
      {
        name: 'مشاوره دکوراسیون',
        url: '/dashboard/content/14',
        icon: 'icon-cursor'
      },
      {
        name: 'حمایت قالیبافان',
        url: '/dashboard/content/15',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    url: '',
    name: 'پنل مدیریت',
    icon: 'icon-cursor',
    roleTypes: ['Admin'],
    children: [
      {
        name: 'کاربران',
        url: '/panel/user',
        icon: 'icon-cursor'
      },
      {
        name: 'ویترین',
        url: '/panel/slide',
        icon: 'icon-cursor'
      },
      {
        name: 'محتوای صفحات',
        url: '/panel/content',
        icon: 'icon-cursor'
      },
      {
        name: 'آمار',
        url: '/panel/file-manager',
        icon: 'icon-cursor'
      },
      {
        name: 'نظر کاربران',
        url: '/panel/like-manager',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'دانلود کاتالوگ',
    url: 'https://www.instagram.com/farshboom/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    roleTypes: null,
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'سایر اطلاعات',
    url: 'https://www.instagram.com/farshboom/',
    icon: 'icon-layers',
    variant: 'danger',
    roleTypes: null,
    attributes: { target: '_blank', rel: 'noopener' }
  },
];
