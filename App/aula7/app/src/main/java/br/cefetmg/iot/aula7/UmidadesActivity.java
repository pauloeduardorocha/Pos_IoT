package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class UmidadesActivity extends AppCompatActivity {

    TextView text_result_umids;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_umidades);

        text_result_umids = (TextView) findViewById(R.id.text_result_umids);
        GetUmidades req = new GetUmidades(text_result_umids);
        req.execute();
    }
}
