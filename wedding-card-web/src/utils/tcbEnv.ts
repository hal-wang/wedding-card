let tcbEnv = (window as any)._tcbEnv;
if (!tcbEnv) {
  (window as any)._tcbEnv = {};
  tcbEnv = (window as any)._tcbEnv;
}
if (!tcbEnv['GROOM']) {
  tcbEnv['GROOM'] = '未设置';
}
if (!tcbEnv['BRIDE']) {
  tcbEnv['BRIDE'] = '未设置';
}
if (!tcbEnv['DATE']) {
  tcbEnv['DATE'] = '2020-10-04 12:00:00';
}
if (!tcbEnv['ADDR']) {
  tcbEnv['ADDR'] = '未设置';
}
if (!tcbEnv['PHONE']) {
  tcbEnv['PHONE'] = 12345678900;
}
if (!tcbEnv['MHID']) {
  tcbEnv['MHID'] = 'shOUWQDqzJohMHYvKd1dMK0';
}
