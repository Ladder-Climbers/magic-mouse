import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, gray } from '@material-ui/core/colors';

class Config {
  ITEM_NAME = "magic_mouse_config";
  constructor() {
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.theme_avaliable = {
      "default": createMuiTheme({}),
      dark: createMuiTheme({
        palette: {
          type: "dark"
        },
      }),
    }
    // 按键映射数据
    this.key_mapping_templates = {
      "default": {
        left: ["left"],
        right: ["right"],
        up: ["up"],
        down: ["down"],
        start: ["f5"],
        stop: ["esc"],
        writing: ["ctrl", 'p'],
        laser: ["ctrl", 'l'],
        ink: ['ctrl', 'm']
      }
    };
    // 在构造函数执行的时候加载保存的数据
    this.data_default = {
      debug: true,
      version_frontend: 0.11,
      api: "ws://192.168.42.214/api/v1/ws",
      // 设置页面地址
      url_config: "/config",
      // 惯用手
      used_hand: "right",
      // 可用的远程服务器列表
      remote_servers: [
        'http://server.chiro.work:10086',
      ],
      // 显示主题
      theme_name: "default",
      theme_avaliable: [
        'default',
        'dark'
      ],
      // 按键映射
      key_mapping_name: "default"
    };
    this.data = this.data_default;
    this.theme = this.theme_avaliable["default"];
    this.key_mapping = this.key_mapping_templates['default'];
    this.load();
  }

  load() {
    console.log("Config: loading magic mouse config...");
    if (this.data.debug) {
      console.log("Config: load default config.");
      this.save();
    }
    try {
      this.data = JSON.parse(localStorage.getItem(this.ITEM_NAME));
      if (!this.data) throw new Error("Null data");
      console.log("Got data:", this.data);
      if (!this.data.version_frontend || this.data.version_frontend < this.data_default.version_frontend) {
        // 版本升级，增量更新
        console.log(`Config: update ${this.data.version_frontend} -> ${this.data_default.version_frontend}`);
        this.data.version_frontend = this.data_default.version_frontend;
        for (let k in this.data_default) {
          if (!this.data[k]) {
            console.log(`    Config: add value ${k}`);
            this.data[k] = this.data_default[k];
          }
        }
        this.save();
      }
    } catch (e) {
      console.warn(`Can not find ${this.ITEM_NAME} in localStorage, use default config.`);
      this.data = this.data_default;
      this.save();
    }
    this.theme = this.theme_avaliable[this.data.theme_name];
    if (!this.theme) this.theme = this.theme_avaliable["default"];
    this.key_mapping = this.key_mapping_templates[this.data.key_mapping_name];
    if (!this.key_mapping) this.key_mapping = this.key_mapping_templates['default'];
  }

  save() {
    console.log("Config: saving magic mouse config...");
    localStorage.setItem(this.ITEM_NAME, JSON.stringify(this.data));
  }
};

export default Config;