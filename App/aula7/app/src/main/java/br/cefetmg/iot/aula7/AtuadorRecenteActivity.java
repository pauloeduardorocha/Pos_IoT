package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class AtuadorRecenteActivity extends AppCompatActivity {

    TextView text_result;
    GetAtuadorRecente req;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atuador_recente);

        text_result = (TextView) findViewById(R.id.text_result);
        req = new GetAtuadorRecente(text_result);
        req.execute();
    }

    @Override
    protected void onPause() {
        super.onPause();
        req.cancel(true);
    }
}
