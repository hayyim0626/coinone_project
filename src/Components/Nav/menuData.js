const menuData = {
  menuContents: [
    { id: 0, menuName: '간편구매', menuDetail: [] },
    { id: 1, menuName: '거래소', menuDetail: [] },
    { id: 2, menuName: '프로차트', menuDetail: [] },
    {
      id: 3,
      menuName: '자산',
      menuDetail: ['수익현황', '입출금', '입금내역'],
    },
    {
      id: 4,
      menuName: '코인정보',
      menuDetail: ['크립토 뉴스', '프로젝트 정보', '암호화폐 명세서'],
    },
    { id: 5, menuName: '플러스', menuDetail: [] },
  ],
  menuValid: [false, false, false, false, false, false],
};

export default menuData;
