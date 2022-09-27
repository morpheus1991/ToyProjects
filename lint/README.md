## 린트 셋팅하기 위해서 만들어 놓은 기본 셋팅

1.prettier - eslint 연동 (충돌하는 옵션 있을 경우 프리티어 것이 적용됨)
2.husky 설정으로 lint 만족시켜야 커밋 가능 단, 스테이지에 올라온 (작업분량)파일 내에서만 린트 검사를 하기 때문에 처음부터 초기 셋팅시에 린트돌려서 클린한 상태로 시작하는 것을 권장함

- npm run lint 시에 전체 린트 돌려볼 수 있음.
- husky 설정은 4버젼대가 package.json에서 간편하게 설정할 수 있어서 다운그레이드 해놓음.
  - 이 조치사항은 해당 설정을 스터디하기에 우선순위가 밀려서임.
  - 따라서 추후 최신 버젼 도입 공부 후 적용이 필요할 수 있음.
- 지금 현재로써는 이정도 설정이면 쓸만하겠다. 기본은 되겠다. 정도를 생각하고 있으나 추후 보완이 필요할 수 있음.

vscode editor setting.json

```

{
  "workbench.iconTheme": "material-icon-theme",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "git.autofetch": true,
  "window.zoomLevel": 2,
  "files.exclude": {
    "**/.git": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.enable": true
}


```
