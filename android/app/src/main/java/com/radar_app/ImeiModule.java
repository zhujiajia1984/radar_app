package com.radar_app;
import android.content.Context;
import android.widget.Toast;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.telephony.TelephonyManager;
import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;

/**
 * Created by zhujiajia on 2018/7/13.
 */

public class ImeiModule extends ReactContextBaseJavaModule {
    public ImeiModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Imei";
    }

    @ReactMethod
    public void getImei(
            Callback errorCb,
            Callback successCb
    ) {
        // 获取imei
        TelephonyManager tm = (TelephonyManager) getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
        try{
            String imei = "";
            String imei2 = "";
            for(int i = 0; i < tm.getPhoneCount(); i++){
                if(i == 0) {
                    imei = tm.getDeviceId(0);
                }
                else{
                    imei2 = tm.getDeviceId(1);
                }
            }
            successCb.invoke(imei, imei2);
        }catch(Exception e){
            errorCb.invoke("fail", "code");
        }
    }
}
