package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class UmidadeRecenteActivity extends AppCompatActivity {

    TextView text_result_umid;
    GetUmidadeRecente req;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_umidade_recente);

        text_result_umid = (TextView) findViewById(R.id.text_result_umid);
        req = new GetUmidadeRecente(text_result_umid);
        req.execute();
    }

    @Override
    protected void onPause() {
        super.onPause();
        req.cancel(true);
    }
}
