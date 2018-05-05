package br.cefetmg.iot.aula7;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class AtuadoresActivity extends AppCompatActivity {

    TextView text_result;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_atuadores);

        text_result = (TextView) findViewById(R.id.text_result);
        GetAtuadores req = new GetAtuadores(text_result);
        req.execute();
    }
}
