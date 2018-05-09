package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class AtuadoresActivity extends AppCompatActivity {

    TextView text_result_atuad_list;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atuadores);

        text_result_atuad_list = (TextView) findViewById(R.id.text_result_atuad_list);
        GetAtuadores req = new GetAtuadores(text_result_atuad_list);
        req.execute();
    }
}
